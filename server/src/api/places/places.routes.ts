import { Router } from 'express';
import getAllPlacesController, { getFeatureDetails } from './features.controller';

const placesRouter = Router();

placesRouter.get('/features', getAllPlacesController);
placesRouter.post('/featuresDetails', getFeatureDetails);

export default placesRouter;
