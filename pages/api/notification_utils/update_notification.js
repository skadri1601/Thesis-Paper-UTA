import { PrismaClient } from "@prisma/client";
import { token_user_details } from "../user_utils/create_user";

const prisma = new PrismaClient();
export async function updateNotification(req) {
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
    return { message: "Review status updated successfully" };
  } catch (error) {
    throw new Error("Failed to update thesis");
  } finally {
    await prisma.$disconnect();
  }
}
