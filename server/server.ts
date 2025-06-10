import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { corsOptions } from './src/config/cors';
import helmet from 'helmet';
import { getUser } from './utiles/global';
import userRoutes from './src/api/user/user.routes';
import placesRoutes from './src/api/places/places.routes';
import favoriteRoutes from './src/api/favorites/favorites.routes';
import filterRoutes from './src/api/filter/filter.routes';
import searchRoutes from './src/api/search/search.routes';
import authRouters from './src/api/auth/auth.routes';

const port = process.env.PORT || 4000;
const app = express();
const prisma = new PrismaClient();

const middleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers,"req.headers?.authorization");
  const user = getUser(req.headers?.authorization);
  res.locals = { prisma, user };
  next();
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(middleware);

app.use(
  '/api',
  userRoutes,
  placesRoutes,
  filterRoutes,
  favoriteRoutes,
  searchRoutes,
  authRouters
);
app.listen(port, () => {
  console.log(`App started successfully on port ${port}`);
});
