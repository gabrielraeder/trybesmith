import { Pool, ResultSetHeader } from 'mysql2/promise';
import connection from './connection';
import { User } from '../interfaces/user.interface';

export default class ProductModel {
  public connection: Pool;

  constructor() {
    this.connection = connection;
  }

  public async create(data: User): Promise<User> {
    const { username, vocation, level, password } = data;
    const [dataInserted] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.users (username, vocation, level, password) VALUES (?, ?, ?, ?)',
      [username, vocation, level, password],
    );
    const { insertId } = dataInserted;
    return { id: insertId, ...data };
  }
}