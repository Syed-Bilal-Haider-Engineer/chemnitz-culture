import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
const search = async (req: Request, res: Response): Promise<void> => {
  const { searchKeyword } = req.query;
  const { prisma } = res.locals;
  try {
    const schema = Joi.object({
      searchKeyword: Joi.string().min(2).required(),
    });

    const { error } = schema.validate({ searchKeyword });

    if (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.details[0].message,
      });
      return;
    }

    const allFeatures = await prisma.feature.findMany();
    const results = allFeatures.filter((feature: any) => {
      const name = feature.properties?.name?.trim().toLowerCase();
      const alt = feature.properties?.alt_name?.trim().toLowerCase();
      return (
        name?.includes((searchKeyword as string).trim().toLowerCase()) ||
        alt?.includes((searchKeyword as string).trim().toLowerCase()) ||
        feature.category?.includes(
          (searchKeyword as string).trim().toLowerCase()
        )
      );
    });

    res.status(StatusCodes.OK).json({
      results,
    });
  } catch (error) {
    console.error('Error search category:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to fetch favorites' });
  }
};

export default search;
