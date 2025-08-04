import Joi from 'joi';

export const organizerLoginSchema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(4).required(),
});

export const organizerSignupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).required(),
    organizationName: Joi.string().required(),
    taxId: Joi.string().optional(),
}); 