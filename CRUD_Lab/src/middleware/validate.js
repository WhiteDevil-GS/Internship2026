import { validationResult } from 'express-validator';

/**
 * Runs after express-validator chains; forwards validation errors to error handler.
 */
export function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Validation failed');
    err.statusCode = 400;
    err.errors = errors.array();
    return next(err);
  }
  next();
}
