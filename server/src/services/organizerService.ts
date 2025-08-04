import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Request } from 'express';

interface OrganizerData {
  name: string;
  email: string;
  password: string;
  organizationName: string;
  taxId?: string;
}

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

const createOrganizer = async (prisma: PrismaClient, organizerData: OrganizerData) => {
  const hashedPassword = await hashPassword(organizerData.password);
  
  return prisma.organizer.create({
    data: {
      name: organizerData.name,
      email: organizerData.email,
      password: hashedPassword,
      organizationName: organizerData.organizationName,
      taxId: organizerData.taxId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      organizationName: true,
      taxId: true,
      isVerified: true,
      createdAt: true,
    },
  });
};

const findOrganizerByEmail = async (prisma: PrismaClient, email: string) => {
  return prisma.organizer.findUnique({
    where: { email },
  });
};

const findOrganizerById = async (prisma: PrismaClient, id: number) => {
  return prisma.organizer.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      organizationName: true,
      taxId: true,
      isVerified: true,
      createdAt: true,
    },
  });
};

const authenticateOrganizer = async (prisma: PrismaClient, email: string, password: string) => {
  const organizer = await findOrganizerByEmail(prisma, email);
  
  if (!organizer) {
    return null;
  }

  const isPasswordValid = await comparePassword(password, organizer.password);
  
  if (!isPasswordValid) {
    return null;
  }

  return {
    id: organizer.id,
    name: organizer.name,
    email: organizer.email,
    organizationName: organizer.organizationName,
    taxId: organizer.taxId,
    isVerified: organizer.isVerified,
  };
};

const organizerService = {
  createOrganizer,
  findOrganizerByEmail,
  findOrganizerById,
  authenticateOrganizer,
};

export default organizerService; 