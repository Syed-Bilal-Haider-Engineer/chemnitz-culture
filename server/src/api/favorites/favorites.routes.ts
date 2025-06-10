import { Router } from 'express';
import  { addFavorite, findAllFavorite, removeFavorite } from './favorites.controller';

const favoriteRoutes = Router();
favoriteRoutes.post('/addFavorite', addFavorite);
favoriteRoutes.post('/removeFavorite', removeFavorite);
favoriteRoutes.get('/findAllFavorites',findAllFavorite);

export default favoriteRoutes;
