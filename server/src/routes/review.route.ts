import { Router } from 'express';
import { middleware } from '../middleware/middleware';
import {
  getReviewsByFeatureId,
  addReview,
  updateReview,
  removeReview,
} from '../controllers/reviews/reviews.controller';
import { validateBody, validateQuery } from '../middleware/validateRequest';
import { addReviewSchema, getReviewByFeatureIdSchema, removeReviewSchema, updateReviewSchema } from '../validation/reviewSchemas';

const reviewsRouter = Router();

reviewsRouter.post('/createReviews', middleware, validateBody(addReviewSchema), addReview);
reviewsRouter.put('/updateReviews', middleware, validateBody(updateReviewSchema), updateReview);
reviewsRouter.delete('/deleteReviews', middleware, validateBody(removeReviewSchema), removeReview);
reviewsRouter.get('/getFeatureReviews', middleware, validateQuery(getReviewByFeatureIdSchema), getReviewsByFeatureId);

export default reviewsRouter;
