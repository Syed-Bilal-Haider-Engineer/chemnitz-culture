import { Router } from 'express';
import search from '../api/search/search.controller';

const searchRoutes = Router();
searchRoutes.get('/search', search);

export default searchRoutes;
