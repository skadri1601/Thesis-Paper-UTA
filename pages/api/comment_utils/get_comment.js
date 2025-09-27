import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function get_user_by_role(req) {
  return await prisma.user.findMany({
    where: { role: req.query["role"] },
  });
}
export async function getCommant(req) {
  try {
    const comment = await prisma.comment.findMany({});
    return comment;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}
