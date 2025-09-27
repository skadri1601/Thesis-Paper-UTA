import { PrismaClient } from "@prisma/client";
import { token_user_details } from "../user_utils/create_user";

const prisma = new PrismaClient();

export async function getNotification(req) {
  try {
    const token = req?.headers["authorization"]?.split(" ")[1];
    const user = await token_user_details(token);
    if (user) {
      const userNotification = await prisma.notificationAudit.findMany({
        where: {
          status: false, // Filter by status
          userId: user.user_id, // Filter by userId
        },
        include: {
          notification: true,
        },
      });
      return userNotification;
    }
    throw new Error("Invalid token");
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}
