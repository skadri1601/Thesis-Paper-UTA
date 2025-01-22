import { PrismaClient } from "@prisma/client";
import { token_user_details } from "./create_user";

const prisma = new PrismaClient();

export async function updateUser(req) {
  try {
    const token = req?.headers["authorization"]?.split(" ")[1];
    if (token) {
      let user = await token_user_details(token);
      const id = user.user_id;

      user = await prisma.user.findMany({
        where: { id: parseInt(id) },
      });
      if (user[0].password == req.body.currentPassword) {
        return await prisma.user.update({
          where: { id: parseInt(id) },
          data: {
            password: req.body.newPassword,
          },
        });
      }
      throw new Error("Failed to update password");
    } else {
      let id = req?.query["id"];
      let { name, email, password } = req.body;
      return await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          name,
          email,
          password,
        },
      });
    }
  } catch (error) {
    throw new Error("Failed to update password");
  } finally {
    await prisma.$disconnect();
  }
}
