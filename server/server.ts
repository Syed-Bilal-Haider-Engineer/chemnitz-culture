import express from 'express';
import cors from 'cors';
import { corsOptions } from './src/config/cors';
import helmet from 'helmet';
import userRoutes from './src/routes/user.routes';
import placesRoutes from './src/routes/places.routes';
import favoriteRoutes from './src/routes/favorites.routes';
import filterRoutes from './src/routes/filter.routes';
import searchRoutes from './src/routes/search.routes';
import authRouters from './src/routes/auth.routes';
import { errorHandler } from './src/middleware/errorHandler';
import { prismaContext } from './src/middleware/prismaInjectContext';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json';
import authenticateRouter from './src/routes/authenticate.routes';
import reviewsRouter from './src/routes/review.route';

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
  authRouters,
  authenticateRouter,
  reviewsRouter
);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App started successfully on port ${port}`);
});


