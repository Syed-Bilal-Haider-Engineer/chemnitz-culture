import { PrismaClient } from "@prisma/client";

export const getPlacesService = async (prisma: PrismaClient) => {
  return prisma.feature.findMany({});
};

export const getPlaceDetailsService = async (
  prisma: PrismaClient,
  featureId: string
) => {
  const feature = await prisma.feature.findUnique({
    where: { id: featureId },
    include: { review: true },
  });

  return feature;
};
