import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

dotenv.config();

const login = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
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

    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    console.log(user,"user")
    if (!user) {
       res.status(401).json({ message: 'email is Invalid .' });
       return;
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log("isMatch=>",isMatch);
    
    if (!isMatch) {
       res.status(401).json({ message: 'password is Invalid.' });
       return;
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    console.log(process.env.JWT_SECRET,"JWT_SECRET");
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });

     res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    next(error);
  }
};

export default login;
