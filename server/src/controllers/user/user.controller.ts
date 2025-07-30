import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
import { getPassword } from '../../utils/authUtils';
import { throwError } from '../../middleware/global';

dotenv.config();

const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { prisma } = res.locals;

    const isExistEmail = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (isExistEmail) {
      return next(throwError(StatusCodes.CONFLICT, 'Email already exists!'));
    }

    const hash = await getPassword(req.body.password);
    const newUser = await prisma.user.create({
      data: { ...req.body, password: hash },
    });
    if (newUser) {
      res.status(StatusCodes.CREATED).json({
        message: 'User created successfully',
      });
    }
  } catch (error) {
    return next(throwError(StatusCodes.NOT_FOUND, 'Internal server error!'));
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { prisma,user } = res.locals;
   
    const updateUser = await prisma.user.update({
      omit: {
        password: true,
      },
      where: {
        id: user?.id,
      },
      data: req.body,
    });
    res.status(StatusCodes.CREATED).json({
      message: 'User Update successfully',
      user: updateUser,
    });
  } catch (error) {
    return next(
      throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server error')
    );
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { prisma,user } = res.locals;
    const getUser = await prisma.user.findUnique({
      omit: {
        password: true,
      },
      where: {
        id:user?.id,
      },
    });
    res.status(StatusCodes.OK).json({
      user: getUser,
    });
  } catch (error: any) {
    return next(
      throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server error')
    );
  }
};

export default addUser;
