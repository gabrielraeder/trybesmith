import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import connection from './connection';
import { User, Login } from '../interfaces/user.interface';

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

  public async login(data: Login): Promise<User | null> {
    const [users] = await this.connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.users WHERE username=?',
      [data.username],
    );
    const [user] = users;
    if (!user) return null;
    return user as User;
  }
}