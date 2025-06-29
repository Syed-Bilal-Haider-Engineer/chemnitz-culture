import { Router } from 'express';
import getAllPlacesController, { getFeatureDetails } from '../api/places/features.controller';

const placesRouter = Router();
placesRouter.get('/features', getAllPlacesController);
placesRouter.get('/featuresDetails', getFeatureDetails);

export default placesRouter;
