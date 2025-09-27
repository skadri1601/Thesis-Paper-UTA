import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { token_user_details } from "../user_utils/create_user";
const prisma = new PrismaClient();

export async function createCommant(req) {
  try {
    const token = req?.headers["authorization"]?.split(" ")[1];
    if (token) {
      const user = await token_user_details(token);
      const { comment, thesisId } = req.body;
      const comments = await prisma.comment.create({
        data: {
          comment,
          userId: user.user_id,
          thesisId,
        },
      });
      return { comment: comments.comment, userName: user.username };
    }
    return {};
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}
