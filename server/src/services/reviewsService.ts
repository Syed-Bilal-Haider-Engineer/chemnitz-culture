// review.service.ts
import { PrismaClient } from '@prisma/client';

export const addReviewService = async (
  prisma: PrismaClient,
  userId: number,
  featureId: string,
  rating: number,
  comment?: string | null
) => {
  // Check if review exists (optional, can be done in controller)
  const existingReview = await prisma.review.findUnique({
    where: {
      userId_featureId: {
        userId,
        featureId,
      },
    },
  });
  if (existingReview) {
    throw new Error('ReviewAlreadyExists');
  }

  return prisma.review.create({
    data: {
      userId,
      featureId,
      rating,
      comment: comment ?? null,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const updateReviewService = async (
  prisma: PrismaClient,
  userId: number,
  reviewId: string,
  rating?: number,
  comment?: string | null
) => {
  const existingReview = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!existingReview) {
    throw new Error('ReviewNotFound');
  }
  if (existingReview.userId !== userId) {
    throw new Error('Forbidden');
  }

  return prisma.review.update({
    where: { id: reviewId },
    data: {
      rating: rating ?? existingReview.rating,
      comment: comment ?? existingReview.comment,
    },
  });
};

export const removeReviewService = async (
  prisma: PrismaClient,
  userId: number,
  reviewId: string
) => {
  const existingReview = await prisma.review.findUnique({
    where: { id: reviewId },
  });
  if (!existingReview) {
    throw new Error('ReviewNotFound');
  }
  if (existingReview.userId !== userId) {
    throw new Error('Forbidden');
  }
  await prisma.review.delete({
    where: { id: reviewId },
  });
};

export const getReviewsByFeatureIdService = async (
  prisma: PrismaClient,
  featureId: string
) => {
  return prisma.review.findMany({
    where: { featureId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};
