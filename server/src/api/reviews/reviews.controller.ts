import { throwError } from '../../../utils/global';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
   console.log(req.body,"request body");
  const { prisma } = res.locals;
  try {
    const schema = Joi.object({
      featureId: Joi.string().required(),
      rating: Joi.number().integer().min(1).max(5).required(),
      comment: Joi.string().allow('').optional(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.details[0].message });
      return;
    }

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
      .json({ message: 'Review created successfully', review });
  } catch (error) {
    console.error('Error creating review:', error);
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
    const schema = Joi.object({
      reviewId: Joi.string().required(),
      rating: Joi.number().integer().min(1).max(5).optional(),
      comment: Joi.string().allow('').optional(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.details[0].message });
      return;
    }

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
      .status(StatusCodes.OK)
      .json({ message: 'Review updated successfully', review: updatedReview });
  } catch (error) {
    console.error('Error updating review:', error);
    return next(
      throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server error')
    );
  }
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { reviewId } = req.body;
  const { prisma } = res.locals;
  
  try {
    const schema = Joi.object({
      reviewId: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.details[0].message });
      return;
    }

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
      .json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
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
  const { featureId } = req.query;
  const { prisma } = res.locals;
  
  try {
    const schema = Joi.object({
      featureId: Joi.string().required(),
    });

    const { error } = schema.validate({ featureId });

    if (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.details[0].message });
      return;
    }

    const reviews = await prisma.review.findMany({
      where: { featureId: featureId as string },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Calculate average rating
    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum:Number, review:any) => sum + review.rating, 0) / reviews.length
      : 0;

    res
      .status(StatusCodes.OK)
      .json({ 
        reviews, 
        averageRating: parseFloat(averageRating.toFixed(1)),
        totalReviews: reviews.length 
      });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return next(
      throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server error')
    );
  }
};
