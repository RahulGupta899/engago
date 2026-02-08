import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  console.log('health check: routes/health')
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
