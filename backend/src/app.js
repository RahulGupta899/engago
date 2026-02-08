import express from 'express';
import { requestLogger, errorHandler } from './middleware/index.js';
import routes from './routes/index.js';

const app = express();

app.use(requestLogger);
app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

export default app;
