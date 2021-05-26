export const notFoundHandler = (req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;

  res.status(404).send('Resource not found');

  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something broke!';

  res.status(status).send({ error: { message } });
};
