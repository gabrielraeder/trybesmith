import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const properties = ['username', 'vocation', 'level', 'password'];
  const body = Object.keys(req.body);
  const map = properties.find((i) => !body.includes(i));
  if (map) {
    return res.status(400).json({ message: `"${map}" is required` });
  }
  next();
};
