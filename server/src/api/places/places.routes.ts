import { Router } from 'express';
import getAllPlacesController from './places.controller';

const placesRouter = Router();

placesRouter.get('/places', getAllPlacesController);

export default placesRouter;
