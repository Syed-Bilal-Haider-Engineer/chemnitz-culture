import { Router } from 'express';
import { getPlaceDetails, getPlaces } from '../controllers/places/places.controller';


const placesRouter = Router();
placesRouter.get('/places',getPlaces);
placesRouter.get('/placeDetails',getPlaceDetails);

export default placesRouter;
