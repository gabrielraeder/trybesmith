import { Pool, RowDataPacket } from 'mysql2/promise';
import { Order } from '../interfaces/order.interface';
import { Product } from '../interfaces/product.interface';
import connection from './connection';

export default class ProductModel {
  public connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const [rows] = await this.connection
      .execute<RowDataPacket[]>('SELECT * FROM Trybesmith.orders');
    return rows as Order[];
  }

  public async getByOrderId(id: number): Promise<Product[]> {
    const [rows] = await this.connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.products WHERE order_id=?',
      [id],
    );
    return rows as Product[];
  }
}