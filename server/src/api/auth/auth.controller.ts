import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { checkPassword, getToken } from '../../../utiles/auth';
import { throwError } from '@/utiles/global';

dotenv.config();

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { prisma } = res.locals;
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.details[0].message });
      return;
    }

    const IsCheckUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    console.log(IsCheckUser, 'user');
    if (!IsCheckUser) {
      return next(throwError(StatusCodes.NOT_FOUND));
      return;
    }

    const passwordMatch = checkPassword(
      req.body.password,
      IsCheckUser.password
    );
    console.log('isMatch=>', passwordMatch);

    if (!passwordMatch) return next(throwError(StatusCodes.UNAUTHORIZED));

    const user = {
      id: IsCheckUser.id,
      name: IsCheckUser.name,
      email: IsCheckUser.email,
      role: IsCheckUser.role,
    };

    console.log(process.env.JWT_SECRET, 'JWT_SECRET');
    const token: string = getToken(user);

    res.status(StatusCodes.OK).json({ user, token });
  } catch (error) {
    next(throwError(StatusCodes.NOT_FOUND));
  }
};

export default login;
