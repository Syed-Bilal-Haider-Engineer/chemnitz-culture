import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import dotenv from 'dotenv';
import { getPassword } from '@/utiles/auth';

dotenv.config();

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { prisma } = res.locals;

    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
      lat: Joi.number().required(),
      lng: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.details[0].message });
      return;
    }

    const isExistEmail = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (isExistEmail) {
      res
        .status(StatusCodes.CONFLICT)
        .json({ message: 'Email already exists!' });
      return;
    }

    const hash = getPassword(req.body.password);
    const newUser = await prisma.user.create({
      data: { ...req.body, password: hash },
    });

    res.status(StatusCodes.CREATED).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { prisma } = res.locals;

    const schema = Joi.object({
      id: Joi.number().required(),
      name: Joi.string().optional(),
      lat: Joi.number().optional(),
      lng: Joi.number().optional(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.details[0].message });
      return;
    }

    const updateUser = await prisma.user.update({
      omit: {
        password: true,
      },
      where: {
        id: req.body?.id,
      },
      data: req.body,
    });
    console.log(updateUser, 'updateUser');
    res.status(StatusCodes.CREATED).json({
      message: 'User Update successfully',
      user: updateUser,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { prisma } = res.locals;

    const schema = Joi.object({
      id: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.details[0].message });
      return;
    }

    const getUser = await prisma.user.findUnique({
      omit: {
        password: true,
      },
      where: {
        id: req.body?.id,
      },
    });
    console.log(getUser, 'getUser');
    res.status(StatusCodes.OK).json({
      user: getUser,
    });
  } catch (error: any) {
    console.log(error.message);
    next(error);
  }
};

export default createUser;
