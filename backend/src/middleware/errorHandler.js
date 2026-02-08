import logger from '../utils/logger.js';
import { AppError } from '../errors/index.js';
import config from '../config/index.js';

/**
 * Global error handling middleware. Must be registered after all routes.
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const code = err instanceof AppError ? err.code : 'INTERNAL_ERROR';
  const message = err instanceof AppError ? err.message : 'Internal server error';

  if (statusCode >= 500) {
    logger.error(
      { err, reqId: req.id, path: req.path, method: req.method },
      err.message
    );
  } else {
    logger.warn({ reqId: req.id, path: req.path, code }, message);
  }

  const payload = {
    error: {
      message,
      code,
      ...(config.isProduction ? {} : { stack: err.stack }),
    },
  };

  res.status(statusCode).json(payload);
};
