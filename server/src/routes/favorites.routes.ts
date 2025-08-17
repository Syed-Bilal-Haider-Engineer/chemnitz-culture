import { Router } from 'express';
import  { addFavorite, getAllFavorite, getFavoriteByFeatureId, removeFavorite } from '../controllers/favorites/favorites.controller';
import { middleware } from '../middleware/middleware';
import validateRequest from '../middleware/validateRequest';
import { favoriteSchema } from '../validation/favoriteSchemas';

const favoriteRoutes = Router();
favoriteRoutes.post('/addFavorite',middleware,validateRequest(favoriteSchema), addFavorite);
favoriteRoutes.post('/removeFavorite',middleware,validateRequest(favoriteSchema), removeFavorite);
favoriteRoutes.get('/findAllFavorites',middleware,getAllFavorite);
favoriteRoutes.get('/favorite', middleware,validateRequest(favoriteSchema), getFavoriteByFeatureId);

export default favoriteRoutes;
