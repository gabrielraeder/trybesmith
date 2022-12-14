import { Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class PostController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const all = await this.orderService.getAll();
    return res.status(200).json(all);
  };

  public create = async (req: Request, res: Response) => {
    const { productsIds, decoded } = req.body;
    const { data: { id } } = decoded;
    const { type, message } = await this.orderService.create(id, productsIds);
    if (type) {
      return res.status(422).json({ message });
    }
    return res.status(201).json(message);
  };
}