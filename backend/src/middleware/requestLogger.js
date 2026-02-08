import crypto from 'node:crypto';
import pino from 'pino-http';
import logger from '../utils/logger.js';

export const requestLogger = pino({
  logger,
  genReqId: (req, res) => {
    const id = req.headers['x-request-id'] ?? crypto.randomUUID();
    res.setHeader('X-Request-Id', id);
    return id;
  },
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
});
