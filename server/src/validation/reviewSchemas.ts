import Joi from 'joi';
export const addReviewSchema = Joi.object({
  featureId: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().allow('').optional(),
});

export const updateReviewSchema = Joi.object({
  reviewId: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).optional(),
  comment: Joi.string().allow('').optional(),
});

export const removeReviewSchema = Joi.object({
  reviewId: Joi.string().required(),
});

export const getReviewByFeatureIdSchema = Joi.object({
  reviewId: Joi.string().required(),
});