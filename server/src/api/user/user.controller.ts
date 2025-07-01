import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import dotenv from 'dotenv';
import { getPassword } from '../../../utils/auth';
import { throwError } from '../../../utils/global';

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
      location: Joi.string().required()
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
   
    const schema = Joi.object({
      name: Joi.string().optional(),
      lat: Joi.number().optional(),
      lng: Joi.number().optional(),
      location: Joi.string().optional()
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
    const schema = Joi.object({
      id: Joi.number().required(),
    });

    const { error } = schema.validate({id:user?.id});

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

export default createUser;
