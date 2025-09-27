import { PrismaClient } from "@prisma/client";
import { token_user_details } from "../user_utils/create_user";

const prisma = new PrismaClient();

async function get_author_thesis_status(req, status_list) {
  const token = req?.headers["authorization"]?.split(" ")[1];
  let filter;
  if (token) {
    filter = await token_user_details(token);
  }
  return await prisma.thesis.findMany({
    where: {
      status: {
        in: status_list,
      },
      ...(filter?.role !== "admin" && filter?.user_id
        ? filter.role === "reviewer"
          ? { reviewerId: filter.user_id }
          : { authorId: filter.user_id }
        : {}),
    },
    include: {
      author: true,
      reviewer: true,
      comments: {
        include: {
          user: true, // Include user details for each comment
        },
      }, // Conditionally include comments
    },
    orderBy: {
      id: "desc", // Change to 'desc' for descending order
    },
  });
}

export async function getThesis(req) {
  try {
    let thesis;
    if (req?.query["status"] == "excluded") {
      thesis = get_author_thesis_status(req, [
        "submitted",
        "reviewed",
        "rejected",
      ]);
    } else if (req?.query["status"] == "published") {
      thesis = get_author_thesis_status(req, ["published"]);
    } else if (req?.query["status"] == "rejected") {
      thesis = get_author_thesis_status(req, ["rejected"]);
    } else {
      thesis = await prisma.thesis.findMany({
        include: {
          author: true,
          reviewer: true,
          comments: true,
        },
        orderBy: {
          id: "desc", // Change to 'desc' for descending order
        },
      });
    }
    return thesis;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}
