import { Router } from 'express';
import  { addFavorite, findAllFavorite, removeFavorite } from './favorites.controller';
import { middleware } from '../../../middleware/middleware';

const favoriteRoutes = Router();
favoriteRoutes.post('/addFavorite',middleware, addFavorite);
favoriteRoutes.post('/removeFavorite',middleware, removeFavorite);
favoriteRoutes.get('/findAllFavorites',middleware,findAllFavorite);

export default favoriteRoutes;
