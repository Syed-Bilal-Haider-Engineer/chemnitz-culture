import { PrismaClient, User } from "@prisma/client";
import { Request } from "express";

export const checkEmailExists = async (prisma: PrismaClient, req: Request): Promise<User | null> => {
  const isExistEmail = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  return isExistEmail;
}

export const addUserService = async (prisma: PrismaClient, req: Request, hash?: string | null): Promise<User> => {
  const userData = { ...req.body };
  
  if (hash) {
    userData.password = hash;
  } else {
    // For Clerk users, remove password field
    delete userData.password;
  }
  
  const latestUser = await prisma.user.create({
    data: userData,
  });
  return latestUser;
}

export default addUserService

export const updateUserService = async (prisma: PrismaClient, req: Request, user: User): Promise<User> => {
  const updateUser = await prisma.user.update({
    where: {
      id: user?.id,
    },
    data: req.body,
  });

  return updateUser;
}

export const getUserProfile = () => {

}