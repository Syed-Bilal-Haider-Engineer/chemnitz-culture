import { searchService } from '../../services/searchService';
import { throwError } from '../../middleware/global';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { prisma } = res.locals;
  const searchKeyword = (req.query.searchKeyword as string)?.trim();

  if (!searchKeyword) {
     res.status(StatusCodes.BAD_REQUEST).json({ message: 'searchKeyword query parameter is required' });
     return;
  }

  try {
    const results = await searchService(prisma, searchKeyword);

    res.status(StatusCodes.OK).json({
      results,
      len: results.length,
    });
  } catch (error) {
    return next(throwError(StatusCodes.INTERNAL_SERVER_ERROR, 'Internal Server error'));
  }
};

export default search;
