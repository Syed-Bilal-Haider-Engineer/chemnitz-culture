
import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().optional(),
  clerkId: Joi.string().optional(), 
});

export const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().optional(), 
  clerkId: Joi.string().optional(), 
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  location: Joi.string().required(),
});