import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createNotification(createFor, title, thesisId) {
  try {
    const notificationObject = await prisma.notification.create({
      data: {
        title,
        thesis: { connect: { id: thesisId } },
      },
    });

    if (notificationObject) {
      const reviewers = await prisma.user.findMany({
        where: {
          role: createFor, // Assuming the role is stored in the 'role' field
        },
        select: {
          id: true, // Get only the user ID
        },
      });
      // Create bulk notification audits for each reviewer
      const notificationAudits = await prisma.notificationAudit.createMany({
        data: reviewers.map((user) => ({
          userId: user.id, // User ID for notification
          notificationId: notificationObject.id, // Reference to the notification//+
        })),
      });
    }
    return notificationObject;
  } catch (error) {
    throw new Error(error);
  }
}
