import { Router } from 'express';
import search from './search.controller';

const searchRoutes = Router();
searchRoutes.post('/search', search);

export default searchRoutes;
