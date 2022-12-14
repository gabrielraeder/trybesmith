import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';

export default (err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  
  res.status(500).json({
    error: {
      message: 'Internal server error!!',
    } });
};
