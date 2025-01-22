import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function delThesis(req) {
  const id = req?.query["id"];
  try {
    return await prisma.thesis.delete({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    throw new Error("Failed to del thesis");
  } finally {
    await prisma.$disconnect();
  }
}
