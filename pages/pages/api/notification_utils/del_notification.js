import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function delNotification(req) {
  try {
    const ids = req.body.ids;
    const deletedUsers = await prisma.notificationAudit.deleteMany({
      where: {
        id: {
          in: ids.map((id) => parseInt(id)), // Ensure IDs are integers
        },
      },
    });
    return { message: "success" };
  } catch (error) {
    throw new Error("Failed to del notification");
  } finally {
    await prisma.$disconnect();
  }
}
