import OrderModel from '../models/order.model';
import { OrderProducts } from '../interfaces/order.interface';
import { productsIdsSchema } from './validations/schemas';

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

  public async create(userId: number, productsIds: number[]) {
    const validate = productsIdsSchema.validate({ productsIds });
    if (productsIds.length === 0) {
      return { type: 'ERROR', message: '"productsIds" must include only numbers' };
    }
    if (validate.error) {
      return { type: 'ERROR', message: validate.error.message };
    }
    const orderId = await this.model.create(userId);
    const promises = productsIds.map((i) => this.model.updateProduct(orderId, i));
    await Promise.all(promises);
    return { type: null, message: { userId, productsIds } };
  }
}