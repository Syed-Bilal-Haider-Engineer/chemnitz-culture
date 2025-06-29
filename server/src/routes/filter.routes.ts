import { Router } from 'express';
import filter from '../api/filter/filter.controller';

const filterRoutes = Router();
filterRoutes.get('/filter', filter);
export default filterRoutes;
