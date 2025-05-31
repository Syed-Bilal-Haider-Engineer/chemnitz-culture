import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const placeAPI = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { prisma } = res.locals;

    const [museums, restaurants, theatres, artworks] = await Promise.all([
      prisma.museums.findMany({
        omit: {
          name: true,
          tourism: true,
          museum: true,
          museum_type: true,
          old_name: true,
          operator: true,
          addr_city: true,
        },
      }),
      prisma.restaurants.findMany({
         omit: {
          name: true,
          amenity: true,
          cuisine: true,
          operator: true,
          addr_city: true,
        }},
      ),
      prisma.theatres.findMany({
         omit: {
          name: true,
          tourism: true,
          museum: true,
          museum_type: true,
          old_name: true,
          operator: true,
          addr_city: true,
        }}),
      prisma.artworks.findMany({
         omit: {
          name: true,
          tourism: true,
          artist_name: true,
          artwork_type: true,
          old_name: true,
          operator: true,
          addr_city: true,
        }},),
    ]);

    console.log(museums, restaurants, theatres, artworks);
    res.status(StatusCodes.OK).json({
      museums,
      restaurants,
      theatres,
      artworks,
    });
  } catch (error) {
    console.error('Error fetching places:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal server error' });
  }
};

export default placeAPI;
