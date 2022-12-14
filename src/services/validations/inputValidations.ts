import { productSchema, userSchema } from './schemas';
import { Product } from '../../interfaces/product.interface';
import { User } from '../../interfaces/user.interface';

export const productValidation = (product: Product) => {
  const validate = productSchema.validate(product);
  if (validate.error) {
    return validate.error.message;
  }
  return null;
};

export const userValidation = (user: User) => {
  const validate = userSchema.validate(user);
  if (validate.error) {
    return validate.error.message;
  }
  return null;
};
