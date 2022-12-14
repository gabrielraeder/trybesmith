import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().min(3),
  amount: Joi.string().min(3),
});

export const userSchema = Joi.object({
  username: Joi.string().min(3),
  vocation: Joi.string().min(3),
  level: Joi.number().min(1),
  password: Joi.string().min(8),
});

export const productsIdsSchema = Joi.object({
  productsIds: Joi.array().items(Joi.number()),
});
