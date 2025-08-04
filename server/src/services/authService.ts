import { PrismaClient, User } from "@prisma/client";
import { Request } from "express";

const authService = async (prisma: PrismaClient, req: Request): Promise<User | null> => {
  const { email, clerkId } = req.body;
  
  if (clerkId) {
    const clerkUser = await prisma.user.findUnique({
      where: { clerkId },
    });
    return clerkUser;
  }
  
  // Otherwise, find user by email (traditional auth)
  const emailUser = await prisma.user.findUnique({
    where: { email },
  });
  return emailUser;
}

export default authService;
