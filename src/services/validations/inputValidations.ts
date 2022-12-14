import productSchema from './schemas';
import { Product } from '../../interfaces/product.interface';

const productValidation = (product: Product) => {
  const validate = productSchema.validate(product);
  if (validate.error) {
    return validate.error.message;
  }
  return null;
};

export default productValidation;