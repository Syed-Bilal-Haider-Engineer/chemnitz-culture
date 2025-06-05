import { Router } from 'express';
import getAllPlacesController from './features.controller';

const placesRouter = Router();

placesRouter.get('/feature', getAllPlacesController);

export default placesRouter;
