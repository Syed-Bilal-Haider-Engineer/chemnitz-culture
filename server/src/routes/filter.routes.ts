import { Router } from 'express';
import filter from '../controllers/filter/filter.controller';
import { validateQuery } from '../middleware/validateRequest';
import { filterCategorySchema } from '../validation/favoriteSchemas';

const filterRoutes = Router();
filterRoutes.get('/filter', validateQuery(filterCategorySchema), filter);
export default filterRoutes;
