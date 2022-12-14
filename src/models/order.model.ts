import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { OrderProducts } from '../interfaces/order.interface';
// import { Product } from '../interfaces/product.interface';
import connection from './connection';

export default class ProductModel {
  public connection: Pool;

  constructor() {
    this.connection = connection;
  }

  // public async getAll(): Promise<Order[]> {
  //   const [rows] = await this.connection
  //     .execute<RowDataPacket[]>('SELECT * FROM Trybesmith.orders');
  //   return rows as Order[];
  // }

  // public async getByOrderId(id: number): Promise<Product[]> {
  //   const [rows] = await this.connection.execute<RowDataPacket[]>(
  //     'SELECT * FROM Trybesmith.products WHERE order_id=?',
  //     [id],
  //   );
  //   return rows as Product[];
  // }

  public async getAll() {
    const [rows] = await this.connection
      .execute<RowDataPacket[]>(
      `SELECT o.id, user_id as userId, JSON_ARRAYAGG(p.id) AS productsIds
      FROM Trybesmith.orders AS o
      INNER JOIN Trybesmith.products AS p 
      ON o.id = p.order_id 
      GROUP BY o.id;`,
    );
    return rows as OrderProducts[];
  }

  public async create(userId: number): Promise<number> {
    const [dataInserted] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.orders (user_id) VALUES (?)',
      [userId],
    );
    const { insertId } = dataInserted;
    return insertId;
  }

  public async updateProduct(orderId: number, productId: number): Promise<void> {
    await this.connection.execute<ResultSetHeader>(
      'UPDATE Trybesmith.products SET order_id=? WHERE id=?',
      [orderId, productId],
    );
  }
}