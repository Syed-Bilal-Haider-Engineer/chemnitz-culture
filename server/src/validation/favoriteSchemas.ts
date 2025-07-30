import Joi from 'joi';
export const favoriteSchema = Joi.object({
  featureId: Joi.string().required(),
});

export const filterCategorySchema = Joi.object({
  category: Joi.string().required(),
});
