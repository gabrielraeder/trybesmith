import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class PostController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const data = req.body;
    const token = await this.userService.create(data);
    return res.status(201).json({ token });
  };

  public login = async (req: Request, res: Response) => {
    const data = req.body;
    const { type, message } = await this.userService.login(data);
    if (type) return res.status(401).json({ message });
    return res.status(200).json({ token: message });
  };
}