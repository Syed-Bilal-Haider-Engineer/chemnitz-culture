import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";

export const addFavoriteService = async (
  prisma: PrismaClient,
  user: User,
  featureId: string
) => {
  return prisma.favorite.create({
    data: {
      userId: user.id,
      featureId,
    },
  });
};

export const removeFavoriteService = async (
  prisma: PrismaClient,
  user: User,
  featureId: string
) => {
  return prisma.favorite.delete({
    where: {
      userId_featureId: {
        userId: user.id,
        featureId,
      },
    },
  });
};

export const getAllFavoriteService = async (
  prisma: PrismaClient,
  user: User
) => {
  return prisma.favorite.findMany({
    where: { userId: user.id },
    include: {
      post: true, 
    },
  });
};

export const getFavoriteByFeatureIdService = async (
  prisma: PrismaClient,
  user: User,
  featureId: string
) => {
  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_featureId: {
        userId: user.id,
        featureId,
      },
    },
  });

  const count = await prisma.favorite.count({
    where: { featureId },
  });

  return { ...favorite, count };
};
