import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import { checkPassword, getToken } from '../../utils/authUtils';
import { throwError } from '../../middleware/global';
import authService from '../../services/authService';

dotenv.config();

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { prisma } = res.locals;
    const IsCheckUser = await authService(prisma, req);
    
    if (!IsCheckUser) {
      return next(throwError(StatusCodes.NOT_FOUND, "User not found!"));
    }

    if (req.body.clerkId) {
      const user = {
        id: IsCheckUser?.id,
        name: IsCheckUser?.name,
        email: IsCheckUser?.email,
        role: IsCheckUser?.role,
      };
      
      const token: string = getToken(user);
      res.status(StatusCodes.OK).json({ user, token });
      return;
    }

    if (!req.body.password) {
      return next(throwError(StatusCodes.BAD_REQUEST, "Password is required for traditional login"));
    }

    const passwordMatch = await checkPassword(
      req.body.password,
      IsCheckUser?.password || ''
    );
    
    if (!passwordMatch) return next(throwError(StatusCodes.UNAUTHORIZED, "Password is Incorrect!"));

    const user = {
      id: IsCheckUser?.id,
      name: IsCheckUser?.name,
      email: IsCheckUser?.email,
      role: IsCheckUser?.role,
    };
    
    const token: string = getToken(user);
    res.status(StatusCodes.OK).json({ user, token });
  } catch (error) {
    console.error('Login error details:', error);
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server error'));
  }
};

export default login;
