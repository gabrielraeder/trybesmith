import UserModel from '../models/user.model';
import { User, Login, LoginReturn, UserReturn } from '../interfaces/user.interface';
import { createToken } from '../auth/jwtFunctions';
import { UserForToken } from '../interfaces/jwt.interface';
import { userValidation } from './validations/inputValidations';

export default class ProductService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async create(data: User): Promise<UserReturn> {
    const validate = userValidation(data);
    if (validate) {
      return { type: 'ERROR', message: validate };
    }
    const newUser = await this.model.create(data);
    const { password, ...userWithoutPassword } = newUser;
    const token = createToken(userWithoutPassword as UserForToken);
    return { type: null, message: token };
  }

  public async login(data: Login): Promise<LoginReturn> {
    const user = await this.model.login(data);
    const verifyPassword = user?.password === data.password;
    if (!user || !verifyPassword) {
      return { type: 'NOT_FOUND', message: 'Username or password invalid' };
    }
    const { password, ...userWithoutPassword } = user;
    const token = createToken(userWithoutPassword as UserForToken);
    return { type: null, message: token };
  }
}