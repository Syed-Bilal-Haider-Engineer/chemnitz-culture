import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
export const addFavorite = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { featureId } = req.body;
  const { prisma } = res.locals;
  try {
    const schema = Joi.object({
      userId: Joi.number().required(),
      featureId: Joi.number().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.details[0].message });
      return;
    }
    const favorite = await prisma.favorite.create({
      data: {
        userId: res.locals.user.id,
        featureId,
      },
    });

    res
      .status(StatusCodes.CREATED)
      .json({ message: 'Favorite added', favorite });
  } catch (error: any) {
    console.error('Error adding favorite:', error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Internal Server Error' });
  }
};

export const removeFavorite = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { featureId } = req.body;
  const { prisma } = res.locals;
  try {
    const schema = Joi.object({
      userId: Joi.number().required(),
      featureId: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.details[0].message });
      return;
    }

    await prisma.favorite.delete({
      where: {
        userId_featureId: {
          userId: res.locals.user.id,
          featureId,
        },
      },
    });

    res.status(200).json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ message: 'Failed to remove favorite' });
  }
};

export const findAllFavorite = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { prisma } = res.locals;

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: res.locals.user.id },
      include: {
        feature: true,
      },
    });

    res.status(StatusCodes.OK).json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to fetch favorites' });
  }
};
