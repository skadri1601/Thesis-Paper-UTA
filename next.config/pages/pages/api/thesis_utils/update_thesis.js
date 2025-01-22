import { PrismaClient } from "@prisma/client";
import { token_user_details } from "../user_utils/create_user";
import { createNotification } from "../notification_utils/create_notification";

const prisma = new PrismaClient();
export async function updateThesis(req) {
  const id = req?.query["id"];
  const { status, comment } = req.body;
  let publishYear = null;
  if (status == "published") {
    publishYear = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
  }
  const token = req?.headers["authorization"]?.split(" ")[1];
  let user;
  if (token) {
    user = await token_user_details(token);
  } else {
  }

  try {
    const thesis = await prisma.thesis.update({
      where: { id: parseInt(id) },
      data: {
        status,
        reviewerId: user.user_id,
        publishYear,
        review_comment: comment,
      },
    });
    //Create Notification For Author
    const author = await prisma.user.findMany({
      where: {
        id: thesis.authorId, // Assuming the role is stored in the 'role' field
      },
    });
    let role;
    let message;
    // Check the status and create corresponding notifications
    if (status === "published") {
      // For both user and author when the thesis is published
      role = "user";
      message = `A new thesis has been Published Title: ${thesis.title} by Author: ${author[0].name} Email: ${author[0].email}`;

      // Send notification to user
      createNotification(role, message, thesis.id);

      // Now, send notification to author
      role = "author";
      message = `Congratulations! Your thesis has been approved by the reviewer.`;
      createNotification(role, message, thesis.id);
    } else if (status === "reviewed") {
      // Only for author when the thesis has been reviewed (but not accepted)
      role = "author";
      message = `The thesis has been rejected by the reviewer. Please address the feedback provided by the reviewer and resubmit the updated thesis for further review.`;
      createNotification(role, message, thesis.id);
    } else if (status === "rejected") {
      // Only for author when the thesis has been rejected
      role = "author";
      message = `We regret to inform you that the thesis has been rejected by the reviewer due to non-compliance with the required standards.`;
      createNotification(role, message, thesis.id);
    }
    return { message: "Review status updated successfully" };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update thesis");
  } finally {
    await prisma.$disconnect();
  }
}
