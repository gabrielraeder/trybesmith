import ProductModel from '../models/product.model';
import { Product } from '../interfaces/product.interface';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel();
  }

  public async create(data: Product): Promise<Product> {
    const product = await this.model.create(data);
    return product;
  }

  public async getAll(): Promise<Product[]> {
    const allProducts = await this.model.getAll();
    return allProducts;
  }
}