import RequestValidationError from '../errors/request-validation-error';

export default (err, req, res, next) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).json(err.serializeErrors());
  }

  return res.status(500).json({
    message: err.message,
    status: 'error',
    data: null
  });
};
