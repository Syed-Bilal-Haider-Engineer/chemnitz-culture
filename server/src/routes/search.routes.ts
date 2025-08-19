import { Router } from 'express';
import search from '../controllers/search/search.controller';
import { validateQuery } from '../middleware/validateRequest';
import { searchSchema } from '../validation/searchSchemas';

const searchRoutes = Router();
searchRoutes.get('/search', validateQuery(searchSchema), search);

export default searchRoutes;