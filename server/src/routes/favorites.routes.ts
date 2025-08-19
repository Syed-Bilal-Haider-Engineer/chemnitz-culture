import { Router } from 'express';
import  { addFavorite, getAllFavorite, getFavoriteByFeatureId, removeFavorite } from '../controllers/favorites/favorites.controller';
import { middleware } from '../middleware/middleware';
import { validateBody, validateQuery } from '../middleware/validateRequest';
import { favoriteSchema } from '../validation/favoriteSchemas';

const favoriteRoutes = Router();
favoriteRoutes.post('/addFavorite', middleware, validateBody(favoriteSchema), addFavorite);
favoriteRoutes.post('/removeFavorite', middleware, validateBody(favoriteSchema), removeFavorite);
favoriteRoutes.get('/findAllFavorites', middleware, getAllFavorite);
favoriteRoutes.get('/favorite', middleware, validateQuery(favoriteSchema), getFavoriteByFeatureId);

export default favoriteRoutes;