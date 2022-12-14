import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'seuSegredoAqui';

function authValidate(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);    
    req.body.decoded = decoded;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export default authValidate;