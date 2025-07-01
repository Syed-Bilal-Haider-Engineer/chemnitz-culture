import { throwError } from '../../../utils/global';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

const filter = async (req: Request, res: Response,next:NextFunction
): Promise<void> => {
  const category = req.query.category as string | undefined;
  
  const { prisma } = res.locals;
  try {
    const schema = Joi.object({
      category: Joi.string().required(),
    });
    const { error } = schema.validate(req.query);

    if (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.details[0].message });
      return;
    }

    const allowedCategories = ['restaurant', 'museum', 'artwork', 'theatre'];
    if (category) {
      if (!allowedCategories.includes((category as string)?.toLowerCase())) {
        return next(throwError(StatusCodes.BAD_REQUEST, 'Invalid category value'));
      }
      const features = await prisma.feature.findMany({
        where: {
          category: {
            equals: (category as string)?.toLowerCase(),
            mode: 'insensitive',
          },
        },
      });

       res.status(StatusCodes.ACCEPTED).json({features, len:features.length});
    }
  } catch (error) {
      return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internel Server error'));
  }
};

export default filter;
