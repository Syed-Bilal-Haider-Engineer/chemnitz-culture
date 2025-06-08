import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const feature = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { prisma } = res.locals;

    const features = await prisma.feature.findMany({});
    res.status(StatusCodes.OK).json({
      features,
    });
  } catch (error) {
    console.error('Error fetching places:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal server error' });
  }
  next();
};

export default feature;
