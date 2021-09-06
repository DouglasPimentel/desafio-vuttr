import express from 'express';

export interface IError extends Error {
  status?: number;
}

export const notFoundHandler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const error: IError = new Error('Not Found');
  error.status = 404;

  res.status(404).send('Resource not found');

  next(error);
};

export const errorHandler = (
  err: IError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const status = err.status || 500;
  const message = err.message || 'Something broke!';

  res.status(status).send({ error: { message } });
};
