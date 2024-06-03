import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('サーバーエラー:', err);
  res.status(500).send({ error: err.message, statusCode: 500 });
};