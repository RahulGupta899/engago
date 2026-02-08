import { Router } from 'express';
import healthRoutes from './health.js';

const router = Router();

router.get('/', (req, res) => {
  console.log('health check: routes/ index')
  res.json({
    name: 'engago-api',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
    },
  });
});

router.use('/health', healthRoutes);

export default router;
