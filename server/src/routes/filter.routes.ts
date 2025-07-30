import { Router } from 'express';
import filter from '../controllers/filter/filter.controller';
import validateRequest from '../middleware/validateRequest';
import { filterCategorySchema } from '../validation/favoriteSchemas';

const filterRoutes = Router();
filterRoutes.get('/filter',validateRequest(filterCategorySchema), filter);
export default filterRoutes;
