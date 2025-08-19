import { addReviewService, getReviewsByFeatureIdService, removeReviewService, updateReviewService } from '../../services/reviewsService';
import { throwError } from '../../middleware/global';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { featureIdService } from '../../services/FeatureIdService';

export const addReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { prisma, user } = res.locals;
  const { featureId, rating, comment } = req.body;

  try {

    const feature = await featureIdService(prisma,featureId);
    if (!feature) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Feature not found' });
      return
    }

    const review = await addReviewService(prisma, user.id, featureId, rating, comment);

    res.status(StatusCodes.CREATED).json({ message: 'Review created successfully', review, success: true });
  } catch (error: any) {
    if (error.message === 'ReviewAlreadyExists') {
       res.status(StatusCodes.CONFLICT).json({ message: 'You have already reviewed this feature' });
       return
    }
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server error'));
  }
};

export const updateReview = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  const { prisma, user } = res.locals;
  const { reviewId, rating, comment } = req.body;

  try {
    const updatedReview = await updateReviewService(prisma, user.id, reviewId, rating, comment);

    res.status(StatusCodes.OK).json({ message: 'Review updated successfully', review: updatedReview });
  } catch (error: any) {
    if (error.message === 'ReviewNotFound') {
       res.status(StatusCodes.NOT_FOUND).json({ message: 'Review not found' });
      return
    }
    if (error.message === 'Forbidden') {
       res.status(StatusCodes.FORBIDDEN).json({ message: 'You can only update your own reviews' });
       return
    }
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server error'));
  }
};

export const removeReview = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  const { prisma, user } = res.locals;
  const { reviewId } = req.body;

  try {
    await removeReviewService(prisma, user.id, reviewId);
    res.status(StatusCodes.OK).json({ message: 'Review deleted successfully', success: true });
  } catch (error: any) {
    if (error.message === 'ReviewNotFound') {
       res.status(StatusCodes.NOT_FOUND).json({ message: 'Review not found' });
       return
    }
    if (error.message === 'Forbidden') {
       res.status(StatusCodes.FORBIDDEN).json({ message: 'You can only delete your own reviews' });
      return
    }
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server error'));
  }
};

export const getReviewsByFeatureId = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  const { prisma } = res.locals;
  const reviewId = req.query.reviewId as string;

  if (!reviewId) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Feature ID is required' });
    return
  }

  try {
    const reviews = await getReviewsByFeatureIdService(prisma, reviewId);
    res.status(StatusCodes.OK).json({ reviews, totalReviews: reviews.length });
  } catch (error) {
    next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server error'));
    return
  }
};
