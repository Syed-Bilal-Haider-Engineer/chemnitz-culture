import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

export const prismaContext = (req: Request, res: Response, next: NextFunction) => {
  res.locals.prisma = prisma;
  next();
};
