import { PrismaClient } from "@prisma/client";
import { token_user_details } from "./create_user";

const prisma = new PrismaClient();

async function get_user_by_role(req) {
  return await prisma.user.findMany({
    where: { role: req.query["role"] },
  });
}
export async function getUser(req) {
  try {
    let user;
    const token = req?.headers["authorization"]?.split(" ")[1];
    if (req?.query["role"]) {
      user = get_user_by_role(req);
    } else if (token) {
      user = await token_user_details(token);
    } else {
      user = await prisma.user.findMany({});
    }
    return user;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}
