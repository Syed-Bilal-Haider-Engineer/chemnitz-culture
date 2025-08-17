import Joi from 'joi';
export const addUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(5).max(255).required(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  location: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  lat: Joi.number().optional(),
  lng: Joi.number().optional(),
  location: Joi.string().optional(),
});

export const getUserProfileSchema = Joi.object({
  id: Joi.number().required(),
});