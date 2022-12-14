import ProductModel from '../models/product.model';
import { Product, ProductObjReturn } from '../interfaces/product.interface';
import { productValidation } from './validations/inputValidations';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel();
  }

  public async create(data: Product): Promise<ProductObjReturn> {
    const validate = productValidation(data);
    if (validate) {
      return { type: 'ERROR', message: validate };
    }
    const product = await this.model.create(data);
    return { type: null, message: product };
  }

  public async getAll(): Promise<Product[]> {
    const allProducts = await this.model.getAll();
    return allProducts;
  }
}