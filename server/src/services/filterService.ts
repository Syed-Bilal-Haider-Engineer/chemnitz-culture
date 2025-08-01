import { PrismaClient } from "@prisma/client";

export const filterService = async (
  prisma: PrismaClient,
  category?: string
) => {
  const allowedCategories = ["restaurant", "museum", "artwork", "theatre"];

  if (category && !allowedCategories.includes(category.toLowerCase())) {
    return { error: "Invalid category" };
  }

  const features = await prisma.feature.findMany({
    where: category
      ? {
          category: {
            equals: category.toLowerCase(),
            mode: "insensitive",
          },
        }
      : {},
  });

  return { features, len: features.length };
};
