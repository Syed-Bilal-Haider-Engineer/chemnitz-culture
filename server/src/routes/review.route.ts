import { Router } from 'express';
import { middleware } from '../middleware/middleware';
import {
  getReviewsByFeatureId,
  addReview,
  updateReview,
  removeReview,
} from '../controllers/reviews/reviews.controller';
import validateRequest from '../middleware/validateRequest';
import { addReviewSchema, getReviewByFeatureIdSchema, removeReviewSchema, updateReviewSchema } from '../validation/reviewSchemas';

const reviewsRouter = Router();

reviewsRouter.post('/createReviews', middleware,validateRequest(addReviewSchema), addReview);
reviewsRouter.put('/updateReviews', middleware, validateRequest(updateReviewSchema),updateReview);
reviewsRouter.delete('/deleteReviews', middleware,validateRequest(removeReviewSchema), removeReview);
reviewsRouter.get('/getFeatureReviews',middleware, validateRequest(getReviewByFeatureIdSchema),getReviewsByFeatureId);

export default reviewsRouter;
