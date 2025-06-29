import { Router } from 'express';
import  { addFavorite, findAllFavorite, findFavoriteByFeatureId, removeFavorite } from '../api/favorites/favorites.controller';
import { middleware } from '../../middleware/middleware';

const favoriteRoutes = Router();
favoriteRoutes.post('/addFavorite',middleware, addFavorite);
favoriteRoutes.post('/removeFavorite',middleware, removeFavorite);
favoriteRoutes.get('/findAllFavorites',middleware,findAllFavorite);
favoriteRoutes.get('/favorite', middleware, findFavoriteByFeatureId);

export default favoriteRoutes;
