import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
import { getPassword } from '../../utils/authUtils';
import { throwError } from '../../middleware/global';
import addUserService, { checkEmailExists, updateUserService } from '../../services/userService';

dotenv.config();

const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { prisma } = res.locals;
    const isExistEmail = await checkEmailExists(prisma,req);

    if (isExistEmail) {
      return next(throwError(StatusCodes.CONFLICT, 'Email already exists!'));
    }

    const hash = await getPassword(req.body.password);
    const latestUser = await addUserService(prisma,req,hash);

    if (latestUser) {
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
    const updateUser = await updateUserService(prisma,req,user);
    const {password, ...rest} = updateUser;
    res.status(StatusCodes.CREATED).json({
      message: 'User Update successfully',
      user: rest,
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
