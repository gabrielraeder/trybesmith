import Joi from 'joi';

const productSchema = Joi.object({
  name: Joi.string().min(3),
  amount: Joi.string().min(3),
});

export default productSchema;