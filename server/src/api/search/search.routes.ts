import { Router } from 'express';
import search from './search.controller';

const searchRoutes = Router();
searchRoutes.get('/search', search);

export default searchRoutes;
