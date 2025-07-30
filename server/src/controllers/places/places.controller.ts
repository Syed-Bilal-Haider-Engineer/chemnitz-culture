import { throwError } from '../../middleware/global';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';;

const getPlaces = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {prisma} = res.locals;
    const features = await prisma.feature.findMany({});
    res.status(StatusCodes.OK).json({
      features,
    });
  } catch (error) {
    next(throwError(StatusCodes.NOT_FOUND, 'Internal server error'));
  }
};

export const getPlaceDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { prisma } = res.locals;
    const { featureId } = req.query; 

    if (!featureId) {
      return next(throwError(StatusCodes.NOT_FOUND, 'Feature ID is required!'));
    }

    const feature = await prisma.feature.findUnique({
      where: {
        id: featureId,
      },
      include: {
        review: true,
      },
    });
    
    if (!feature) {
      return next(throwError(StatusCodes.NOT_FOUND, 'Feature not found !'));
    }
    res.status(StatusCodes.OK).json({ feature });
  } catch (error) {
    console.error(
      `Error fetching feature details for ID ${req.params.id}:`,
      error
    );
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internel Server error'));
  }
};

export default getPlaces;
