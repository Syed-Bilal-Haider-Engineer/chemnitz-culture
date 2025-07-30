import { throwError } from '../../middleware/global';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const addReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { prisma } = res.locals;
  try {

    // Check if feature exists
    const feature = await prisma.feature.findUnique({
      where: { id: req.body.featureId }
    });

    if (!feature) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Feature not found' });
      return;
    }

    const existingReview = await prisma.review.findUnique({
      where: {
        userId_featureId: {
          userId: res.locals.user.id,
          featureId:req.body.featureId
        }
      }
    });

    if (existingReview) {
      res
        .status(StatusCodes.CONFLICT)
        .json({ message: 'You have already reviewed this feature' });
      return;
    }

    const review = await prisma.review.create({
      data: {
        userId: res.locals.user.id,
        featureId:req.body.featureId,
        rating:req.body.rating,
        comment: req.body.comment || null
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res
      .status(StatusCodes.CREATED)
      .json({ message: 'Review created successfully', review,success:true });
  } catch (error) {
    return next(
      throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server error')
    );
  }
};

export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { reviewId, rating, comment } = req.body;
  const { prisma } = res.locals;
  try {

    // Check if review exists and belongs to the user
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId }
    });

    if (!existingReview) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Review not found' });
      return;
    }

    if (existingReview.userId !== res.locals.user.id) {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'You can only update your own reviews' });
      return;
    }

    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        rating: rating !== undefined ? rating : existingReview.rating,
        comment: comment !== undefined ? comment : existingReview.comment
      }
    });

    res
      .status(StatusCodes.OK)
      .json({ message: 'Review updated successfully', review: updatedReview });
  } catch (error) {
    return next(
      throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server error')
    );
  }
};

export const removeReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { reviewId } = req.body;
  const { prisma } = res.locals;
  try {
 
    // Check if review exists and belongs to the user
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId }
    });

    if (!existingReview) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Review not found' });
      return;
    }

    if (existingReview.userId !== res.locals.user.id) {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'You can only delete your own reviews' });
      return;
    }

    await prisma.review.delete({
      where: { id: reviewId }
    });

    res
      .status(StatusCodes.OK)
      .json({ message: 'Review deleted successfully', success:true });
  } catch (error) {
    return next(
      throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server error')
    );
  }
};

export const getReviewsByFeatureId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { reviewId } = req.query;
  const { prisma } = res.locals;
  console.log("reviewId==>",reviewId)
  try {
   const reviews = await prisma.review.findUnique({
      where: {
        id: reviewId as string,
        userId: res.locals.user?.id, 
      }
   });
  console.log("reviews=>",reviews)
    res
      .status(StatusCodes.OK)
      .json({ 
        reviews, 
        totalReviews: reviews.length 
      });
  } catch (error) {
    return next(
      throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server error')
    );
  }
};
