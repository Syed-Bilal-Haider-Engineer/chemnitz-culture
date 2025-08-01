import { getPlaceDetailsService, getPlacesService } from "../../services/placesService";
import { throwError } from "../../middleware/global";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const getPlaces = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { prisma } = res.locals;
    const features = await getPlacesService(prisma);

    res.status(StatusCodes.OK).json({ features });
  } catch (error) {
    next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error"));
  }
};

export const getPlaceDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { prisma } = res.locals;
    const { featureId } = req.query as { featureId?: string };

    if (!featureId) {
      return next(throwError(StatusCodes.BAD_REQUEST, "Feature ID is required!"));
    }

    const feature = await getPlaceDetailsService(prisma, featureId);

    if (!feature) {
      return next(throwError(StatusCodes.NOT_FOUND, "Feature not found!"));
    }

    res.status(StatusCodes.OK).json({ feature });
  } catch (error) {
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error"));
  }
};
