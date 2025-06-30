import { throwError } from '../../../utils/global';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';;

const feature = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {prisma} = res.locals;
    const features = await prisma.feature.findMany({});
    console.log(features.length,"features")
    res.status(StatusCodes.OK).json({
      features,
    });
  } catch (error) {
    console.error('Error fetching places:', error);
    next(throwError(StatusCodes.NOT_FOUND, 'Internal server error'));
  }
};

export const getFeatureDetails = async (
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
        review: true
      },
    });

    if (!feature) {
      return next(throwError(StatusCodes.NOT_FOUND, 'Feature not found !'));
    }
  console.log(feature,"length")
    res.status(StatusCodes.OK).json({ feature });
  } catch (error) {
    console.error(
      `Error fetching feature details for ID ${req.params.id}:`,
      error
    );
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internel Server error'));
  }
};

export default feature;
