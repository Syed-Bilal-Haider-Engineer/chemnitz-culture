import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { corsOptions } from './src/config/cors';
import helmet from 'helmet';
import { getUser } from './utiles/global';
import router from './src/api/user/user.routes';
import placesRouter from './src/api/places/places.routes';
import favoriteRoutes from './src/api/favorites/favorites.routes';
import filterRoutes from './src/api/filter/filter.routes';
import searchRoutes from './src/api/search/search.routes';
import authRouters from './src/api/auth/auth.routes';

const port = process.env.PORT || 4000;
const app = express();
const prisma = new PrismaClient();

const middleware = (req: Request, res: Response, next: NextFunction) => {
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
  router,
  placesRouter,
  filterRoutes,
  favoriteRoutes,
  searchRoutes,
  authRouters
);
app.listen(port, () => {
  console.log(`App started successfully on port ${port}`);
});
