import { Router } from 'express';
import filter from './filter.controller';

const filterRoutes = Router();
filterRoutes.post('/filter', filter);
export default filterRoutes;
