import { Router } from 'express';
import  { addFavorite, findAllFavorite, removeFavorite } from './favorites.controller';
import { StatusCodes } from 'http-status-codes';

const favoriteRoutes = Router();
favoriteRoutes.post('/addFavorite', addFavorite);
favoriteRoutes.post('/removeFavorite', removeFavorite);
favoriteRoutes.get('/findAllFavorites',findAllFavorite);

export default favoriteRoutes;
