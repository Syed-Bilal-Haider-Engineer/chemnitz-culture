import { addFavoriteService, getAllFavoriteService, getFavoriteByFeatureIdService, removeFavoriteService } from "../../services/favoriteService";
import { throwError } from "../../middleware/global";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const addFavorite = async (req: Request, res: Response, next: NextFunction) => {
  const { featureId } = req.body;
  const { prisma, user } = res.locals;

  try {
    const favorite = await addFavoriteService(prisma, user, featureId);
    res.status(StatusCodes.CREATED).json({ message: "Favorite added", favorite });
  } catch (error) {
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server error"));
  }
};

export const removeFavorite = async (req: Request, res: Response, next: NextFunction) => {
  const { featureId } = req.body;
  const { prisma, user } = res.locals;

  try {
    await removeFavoriteService(prisma, user, featureId);
    res.status(StatusCodes.OK).json({ message: "Favorite removed successfully" });
  } catch (error) {
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server error"));
  }
};

export const getAllFavorite = async (req: Request, res: Response, next: NextFunction) => {
  const { prisma, user } = res.locals;

  try {
    const favorites = await getAllFavoriteService(prisma, user);
    res.status(StatusCodes.OK).json(favorites);
  } catch (error) {
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server error"));
  }
};

export const getFavoriteByFeatureId = async (req: Request, res: Response, next: NextFunction) => {
  const { featureId } = req.query;
  const { prisma, user } = res.locals;

  try {
    const favorite = await getFavoriteByFeatureIdService(prisma, user, featureId as string);
    res.status(StatusCodes.OK).json(favorite);
  } catch (error) {
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server error"));
  }
};
