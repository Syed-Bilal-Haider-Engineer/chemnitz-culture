import { Router } from 'express';
import getAllPlacesController, { getPlaceDetails } from '../controllers/places/places.controller';

const placesRouter = Router();
placesRouter.get('/places',getAllPlacesController);
placesRouter.get('/placeDetails',getPlaceDetails);

export default placesRouter;
