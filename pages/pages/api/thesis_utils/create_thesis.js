import { PrismaClient } from "@prisma/client";
import { upload } from "../../../lib/multerConfig";
import path from "path";
import fs from "fs";
import { createNotification } from "../notification_utils/create_notification";
const prisma = new PrismaClient();
function file_upload(filename, base64Data) {
  // Decode Base64 string to binary data
  const buffer = Buffer.from(base64Data, "base64");

  // Set the storage path
  const storagePath = path.join("public", filename);

  // Write the binary data to the file
  fs.writeFile(storagePath, buffer, (err) => {
    if (err) {
      console.error("Error saving file:", err);
    } else {
      console.log("File saved successfully:", storagePath);
    }
  });
}
function parseFormData(rawData) {
  // Split the data using the boundary defined in the input (the random part)
  const boundary = rawData.split("\n")[0].trim(); // Get the boundary
  const parts = rawData.split(boundary).slice(1, -1); // split and remove first and last empty parts

  const parsedData = {};

  parts.forEach((part) => {
    const nameMatch = part.match(/name="(.+?)"/);
    const valueMatch = part.match(/\r?\n\r?\n([\s\S]*)$/);

    if (nameMatch && valueMatch) {
      const name = nameMatch[1].trim();
      let value = valueMatch[1].trim();

      if (value == "null") {
        value = null;
      }
      if (name == "authorId" || name == "reviewerId") {
        if (value == "null") {
          value = null;
        } else {
          value = parseInt(value);
        }
      }
      parsedData[name] = value;
    }
  });

  return parsedData;
}

async function incrementViewCount(thesisId) {
  try {
    // Fetch the current view count
    const thesis = await prisma.thesis.findUnique({
      where: { id: thesisId },
      select: { view_count: true },
    });

    if (!thesis) {
      throw new Error("Thesis not found");
    }

    // Increment the view count by 1
    const updatedThesis = await prisma.thesis.update({
      where: { id: thesisId },
      data: { view_count: thesis.view_count + 1 },
    });

    console.log("Updated view count:", updatedThesis.view_count);
    return updatedThesis.view_count;
  } catch (error) {
    console.error("Error updating view count:", error);
    throw error;
  }
}
export async function createThesis(req) {
  if (req?.query["for"]) {
    incrementViewCount(req.body["paperId"]);
    return true; // Assume successful view count increment for demo purposes. In a real-world scenario, you would handle the view count increment differently.
  } else {
    const data = parseFormData(req.body);
    // upload.single("document");
    file_upload(data["filename"], data["file"]);
    const {
      title,
      abstract,
      contributorAuthors,
      references,
      publishYear,
      keyword,
      status,
      authorId,
      reviewerId,
    } = data;
    try {
      const thesis = await prisma.thesis.create({
        data: {
          title,
          abstract,
          contributorAuthors,
          references,
          publishYear,
          keyword,
          document: data.filename,
          status,
          author: {
            connect: { id: authorId }, // Connect to the existing author by ID
          },
          reviewer: reviewerId ? { connect: { id: reviewerId } } : undefined,
        },
      });

      //Create Notification For Author
      const author = await prisma.user.findMany({
        where: {
          id: authorId, // Assuming the role is stored in the 'role' field
        },
      });

      createNotification(
        "reviewer",
        `The author has uploaded a new thesis Title : ${thesis.title}, Author : ${author[0].name} Email : ${author[0].email} \n Please review it at your earliest convenience.`,
        thesis.id
      );

      return thesis;
    } catch (error) {
      throw new Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }
}
