import { Router } from 'express';
import search from '../controllers/search/search.controller';
import validateRequest from '../middleware/validateRequest';
import { searchSchema } from '../validation/searchSchemas';

const searchRoutes = Router();
searchRoutes.get('/search',validateRequest(searchSchema), search);

export default searchRoutes;
