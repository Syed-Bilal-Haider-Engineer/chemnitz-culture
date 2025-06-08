import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

const filter = async (req: Request, res: Response): Promise<void> => {
  const { category } = req.query;
  const { prisma } = res.locals;
  try {
    const schema = Joi.object({
      category: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.details[0].message });
      return;
    }

    const allowedCategories = ['restaurant', 'museum', 'artwork', 'theater'];
    if (category) {
      if (!allowedCategories.includes((category as string)?.toLowerCase())) {
         res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Invalid category value' });
      }
      const features = await prisma.feature.findMany({
        where: {
          pro: {
            equals: (category as string)?.toLowerCase(),
            mode: 'insensitive',
          },
        },
      });

       res.status(StatusCodes.ACCEPTED).json(features);
    }
  } catch (error) {
    console.error('Filter error:', error);
     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server Error' });
  }
};

export default filter;
