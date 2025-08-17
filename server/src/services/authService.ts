import { PrismaClient, User } from "@prisma/client";
import { Request } from "express";

const authService  = async(prisma:PrismaClient, req:Request):Promise<User| null> => {
    const { email } = req.body;
      const IsCheckUser = await prisma.user.findUnique({
          where: { email },
        });
    return IsCheckUser;
}

export default authService
