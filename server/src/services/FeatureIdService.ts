import { PrismaClient } from "@prisma/client";

export const featureIdService = async(prisma:PrismaClient,id:string) => {
  const feature = await prisma.feature.findUnique({ where: { id } });
  return feature;
}
