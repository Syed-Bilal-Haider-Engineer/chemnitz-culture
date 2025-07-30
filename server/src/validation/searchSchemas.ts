import Joi from 'joi';
 export const searchSchema = Joi.object({
    searchKeyword: Joi.string().min(2).required(),
});
