import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

 const meusamAPI = async (req: Request, res: Response,next:any) =>  {
  try {
    const museums = await res.locals.prisma.Museums.findMany();
    return res.status(StatusCodes.OK).json(museums);
  } catch (error) {
    return next()
  }
};

export default meusamAPI;
