import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function delUser(req) {
  try {
    const id = req?.query["id"];
    return await prisma.user.delete({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    throw new Error("Failed to del thesis");
  } finally {
    await prisma.$disconnect();
  }
}
