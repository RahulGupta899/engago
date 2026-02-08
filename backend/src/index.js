import app from './app.js';
import config from './config/index.js';
import logger from './utils/logger.js';

app.get('/health', (req, res) => {
  console.log('health check: Root')
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const server = app.listen(config.port, () => {
  logger.info({ port: 7000, env: config.env }, 'Server started');
});

const shutdown = (signal) => {
  logger.info({ signal }, 'Shutting down');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
