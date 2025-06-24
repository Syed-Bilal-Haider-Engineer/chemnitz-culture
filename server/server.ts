import express from 'express';
import cors from 'cors';
import { corsOptions } from './src/config/cors';
import helmet from 'helmet';
import userRoutes from './src/api/user/user.routes';
import placesRoutes from './src/api/places/places.routes';
import favoriteRoutes from './src/api/favorites/favorites.routes';
import filterRoutes from './src/api/filter/filter.routes';
import searchRoutes from './src/api/search/search.routes';
import authRouters from './src/api/auth/auth.routes';
import { errorHandler } from './utils/errorHandler';
import { prismaContext } from './middleware/prismaInjectContext';

const port = process.env.PORT || 4000;
const app = express();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(prismaContext);
app.use(
  '/api',
  favoriteRoutes,
  userRoutes,
  placesRoutes,
  filterRoutes,
  searchRoutes,
  authRouters
);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`App started successfully on port ${port}`);
});


