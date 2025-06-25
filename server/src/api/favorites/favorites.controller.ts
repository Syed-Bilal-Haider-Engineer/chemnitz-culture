import { throwError } from '../../../utils/global';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

export const addFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { featureId } = req.body;
  const { prisma } = res.locals;
  try {
    console.log("featureId",featureId)
    const schema = Joi.object({
      featureId: Joi.string().required(),
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
        userId: res.locals.user?.id,
        featureId,
      },
    });
    console.log(favorite,"favorite")
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'Favorite added', favorite });
  } catch (error: any) {
    console.error('Error adding favorite:', error);
        return next(
          throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internel Server error')
        );
  }
};

export const removeFavorite = async (
  req: Request,
  res: Response,
  next:NextFunction
): Promise<void> => {
  const { featureId } = req.body;
  const { prisma } = res.locals;
  try {
    const schema = Joi.object({
      featureId: Joi.string().required(),
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
          featureId: featureId as string,
        },
      },
    });

    res.status(200).json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internel Server error'));
  }
};

export const findAllFavorite = async (
  req: Request,
  res: Response,
  next:NextFunction
): Promise<void> => {
  const { prisma } = res.locals;

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: res.locals.user.id },
      include: {
        post: true,
      },
    });

    console.log("favorites=>",favorites)

    res.status(StatusCodes.OK).json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
     return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internel Server error'));
  }
};

export const findFavoriteByFeatureId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { featureId } = req.query;  
  const { prisma, user } = res.locals;

  try {
    const schema = Joi.object({
      featureId: Joi.string().required(),
    });

    const { error } = schema.validate({ featureId });

    if (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
      return;
    }

    console.log("featureId==>",featureId,typeof user.id)
  
   const favorite = await prisma.favorite.findUnique({
     where: {
      userId_featureId: {
        userId: user.id,
        featureId: featureId as string,
      }
}
   });

   const count = await prisma.favorite.count({
     where: {featureId: featureId as string}
  })

    res.status(StatusCodes.OK).json({ ...favorite, count});
  } catch (error: any) {
    console.error('Error finding favorite:', error);
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server error'));
  }
};
