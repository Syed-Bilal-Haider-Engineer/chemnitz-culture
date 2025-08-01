import { PrismaClient } from "@prisma/client";

export const searchService = async (prisma: PrismaClient, keyword: string) => {
  const allFeatures = await prisma.feature.findMany();
  const search = keyword.trim().toLowerCase();

  return allFeatures.filter((feature:any) => {
    const name = feature.properties?.name?.trim().toLowerCase();
    const alt = feature.properties?.alt_name?.trim().toLowerCase();
    const category = feature.category?.trim().toLowerCase();

    return (
      name?.includes(search) ||
      alt?.includes(search) ||
      category?.includes(search)
    );
  });
};
