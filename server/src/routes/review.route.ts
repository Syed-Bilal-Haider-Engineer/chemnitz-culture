import { Router } from 'express';
import { middleware } from '../../middleware/middleware';
import {
  getReviewsByFeatureId,
  createReview,
  updateReview,
  deleteReview,
} from '../api/reviews/reviews.controller';

const reviewsRouter = Router();

reviewsRouter.post('/createReviews', middleware, createReview);
reviewsRouter.put('/updateReviews', middleware, updateReview);
reviewsRouter.delete('/deleteReviews', middleware, deleteReview);
reviewsRouter.get('/getFeatureReviews', getReviewsByFeatureId);

export default reviewsRouter;
