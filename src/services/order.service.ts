import OrderModel from '../models/order.model';
import { OrderProducts } from '../interfaces/order.interface';

export default class ProductService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel();
  }

  public async getAll(): Promise<OrderProducts[]> {
    const orders = await this.model.getAll();
    const orderIds = orders.map(({ id }) => id);
    const promises = orderIds.map((id) => this.model.getByOrderId(+id));
    const products = await Promise.all(promises);
    const orderProducts = orders.map((order, index) => ({
      id: order.id,
      userId: order.user_id,
      productsIds: products[index].map((item) => item.id),
    }));
    return orderProducts;
  }
}