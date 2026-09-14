import express, { type Express } from 'express';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';

export function createApp(): Express {
  const app = express();

  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use(routes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

const app = createApp();

export default app;
