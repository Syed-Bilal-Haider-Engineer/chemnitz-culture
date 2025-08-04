import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getToken } from '../../utils/authUtils';
import { throwError } from '../../middleware/global';
import organizerService from '../../services/organizerService';

const organizerLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { prisma } = res.locals;
    const { email, password } = req.body;

    if (!email || !password) {
      return next(throwError(StatusCodes.BAD_REQUEST, "Email and password are required"));
    }

    const organizer = await organizerService.authenticateOrganizer(prisma, email, password);
    
    if (!organizer) {
      return next(throwError(StatusCodes.UNAUTHORIZED, "Invalid email or password"));
    }

    const token = getToken({
      id: organizer.id,
      email: organizer.email,
      name: organizer.name,
      role: 'ORGANIZER',
      organizationName: organizer.organizationName,
    });

    res.status(StatusCodes.OK).json({
      message: "Login successful",
      organizer: {
        id: organizer.id,
        name: organizer.name,
        email: organizer.email,
        organizationName: organizer.organizationName,
        isVerified: organizer.isVerified,
      },
      token,
    });
  } catch (error) {
    console.error('Organizer login error:', error);
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server error'));
  }
};

const organizerSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { prisma } = res.locals;
    const { name, email, password, organizationName, taxId } = req.body;

    // Validation
    if (!name || !email || !password || !organizationName) {
      return next(throwError(StatusCodes.BAD_REQUEST, "Name, email, password, and organization name are required"));
    }

    if (password.length < 6) {
      return next(throwError(StatusCodes.BAD_REQUEST, "Password must be at least 6 characters long"));
    }

    // Check if organizer already exists
    const existingOrganizer = await organizerService.findOrganizerByEmail(prisma, email);
    if (existingOrganizer) {
      return next(throwError(StatusCodes.CONFLICT, "Organizer with this email already exists"));
    }

    // Create new organizer
    const newOrganizer = await organizerService.createOrganizer(prisma, {
      name,
      email,
      password,
      organizationName,
      taxId,
    });

    const token = getToken({
      id: newOrganizer.id,
      email: newOrganizer.email,
      name: newOrganizer.name,
      role: 'ORGANIZER',
      organizationName: newOrganizer.organizationName,
    });

    res.status(StatusCodes.CREATED).json({
      message: "Organizer registered successfully",
      organizer: newOrganizer,
      token,
    });
  } catch (error) {
    console.error('Organizer signup error:', error);
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server error'));
  }
};

const getOrganizerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { prisma } = res.locals;
    const organizerId = (req as any).user.id;

    const organizer = await organizerService.findOrganizerById(prisma, organizerId);
    
    if (!organizer) {
      return next(throwError(StatusCodes.NOT_FOUND, "Organizer not found"));
    }

    res.status(StatusCodes.OK).json({
      organizer,
    });
  } catch (error) {
    console.error('Get organizer profile error:', error);
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server error'));
  }
};

export default {
  organizerLogin,
  organizerSignup,
  getOrganizerProfile,
}; 