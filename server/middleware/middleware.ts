import { authenticate } from "../utils/global";
import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from "express";
const prisma = new PrismaClient();
export const middleware = (req: Request, res: Response, next: NextFunction) => {
  const user = authenticate(req.headers?.authorization);
  res.locals = { prisma, user };
  next();
};