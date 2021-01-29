import RequestValidationError from '../errors/request-validation-error';
import ValidationRuleFailedError from '../errors/validation-rule-failed-error';

const errorHandler = (err, req, res, next) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).json(err.serializeErrors());
  }

  if (err instanceof ValidationRuleFailedError) {
    return res.status(err.statusCode).json(err.serializeErrors());
  }

  return res.status(400).json({
    message: err.message
  });
};

export default errorHandler;
