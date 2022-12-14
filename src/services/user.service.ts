import UserModel from '../models/user.model';
import { User } from '../interfaces/user.interface';
import { createToken } from '../auth/jwtFunctions';
import { UserForToken } from '../interfaces/jwt.interface';

export default class ProductService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async create(data: User): Promise<string> {
    const newUser = await this.model.create(data);
    const { password, ...userWithoutPassword } = newUser;
    const token = createToken(userWithoutPassword as UserForToken);
    return token;
  }
}