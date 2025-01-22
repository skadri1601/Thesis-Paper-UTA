import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateCommant(req) {
  const id = req?.query["id"];
  const { comment, userId, thesisId } = req.body;
  try {
    return await prisma.comment.update({
      where: { id: parseInt(id) },
      data: {
        comment,
        userId,
        thesisId,
      },
    });
  } catch (error) {
    throw new Error("Failed to update thesis");
  } finally {
    await prisma.$disconnect();
  }
}
