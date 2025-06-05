import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import dotenv from 'dotenv';

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
    const saltRounds = 10;
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    console.log(hash, 'hash');
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
      name: Joi.string().required(),
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

    const updateUser = await prisma.user.update({
      where: {
        id: req.body?.id
      },
      data: {
        name:req.body?.name,
        lat: req.body?.lat,
        lng: req.body?.lng
      },
    });

    res.status(StatusCodes.CREATED).json({
      message: 'User Update successfully',
      user: updateUser
    });
  } catch (error) {
    next(error);
  }
};

export default createUser;
