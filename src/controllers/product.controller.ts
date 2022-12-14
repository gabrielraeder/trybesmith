import { Request, Response } from 'express';
import ProductService from '../services/product.service';

export default class PostController {
  constructor(private productService = new ProductService()) { }

  public create = async (req: Request, res: Response) => {
    const data = req.body;
    const newProduct = await this.productService.create(data);
    return res.status(201).json(newProduct);
  };

  public getAll = async (_req: Request, res: Response) => {
    const allProducts = await this.productService.getAll();
    return res.status(200).json(allProducts);
  };
}