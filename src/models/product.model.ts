import { Pool, ResultSetHeader } from 'mysql2/promise';
import connection from './connection';
import { Product } from '../interfaces/product.interface';

export default class ProductModel {
  public connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public async create(data: Product): Promise<Product> {
    const { name, amount } = data;
    const [dataInserted] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const { insertId } = dataInserted;
    return { id: insertId, ...data };
  }

  public async getAll(): Promise<Product[]> {
    const [rows] = await this.connection.execute(
      'SELECT * FROM Trybesmith.products',
    );
    return rows as Product[];
  }

  // public async getByOrderId(id:string): Promise<RowDataPacket[]> {
  //   const [rows] = await this.connection.execute<RowDataPacket[]>(
  //     'SELECT id FROM Trybesmith.products WHERE order_id=?',
  //     [id],
  //   );
  //   return rows;
  // }
}