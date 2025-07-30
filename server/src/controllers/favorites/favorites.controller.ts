import { throwError } from '../../middleware/global';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const addFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { featureId } = req.body;
  const { prisma } = res.locals;
  try {
 
  const favorite = await prisma.favorite.create({
      data: {
        userId: res.locals.user?.id,
        featureId,
      },
    });
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'Favorite added', favorite });
  } catch (error: any) {
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
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internel Server error'));
  }
};

export const getAllFavorite = async (
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

    res.status(StatusCodes.OK).json(favorites);
  } catch (error) {
     return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internel Server error'));
  }
};

export const getFavoriteByFeatureId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { featureId } = req.query;  
  const { prisma, user } = res.locals;

  try {
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
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server error'));
  }
};
