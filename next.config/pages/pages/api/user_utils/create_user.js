import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export async function token_user_details(token) {
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user data to the request object
    return {
      user_id: decoded.user_id,
      username: decoded.username,
      email: decoded.email,
      number: decoded.number,
      role: decoded.role,
    };
  } catch (error) {
    return error;
  }
}

export async function createUser(req) {
  try {
    let user;
    const token = req?.headers["authorization"]?.split(" ")[1];

    if (token) {
      user = await token_user_details(token);
    } else {
      const { name, email, role, password } = req.body;
      user = await prisma.user.create({
        data: {
          name,
          email,
          role,
          password,
        },
      });
    }
    return user;
  } catch (error) {
    throw new Error(error);
  } finally {
    await prisma.$disconnect();
  }
}
