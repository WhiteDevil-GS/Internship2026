// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';
  console.error(message);
  res.status(status).json({
    success: false,
    message,
    ...(err.errors && { errors: err.errors }),
  });
}
