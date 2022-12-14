import { Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class PostController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const all = await this.orderService.getAll();
    return res.status(200).json(all);
  };
}