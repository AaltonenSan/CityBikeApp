import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes/index';
import helmet from 'helmet';
import logger from './utils/logger';
import cors from 'cors';
dotenv.config()

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// Log incoming requests
app.use((req: Request, res: Response, next: Function) => {
  if (process.env.NODE_ENV !== 'test') {
    logger.info(`${req.method} ${req.url}`);
  };
  next();
})
// Log outgoing responses
app.use((req: Request, res: Response, next: Function) => {
  res.on('finish', () => {
    if (process.env.NODE_ENV !== 'test') {
      logger.info(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`);
    };
  });
  next();
})

app.use('/api', router);

export default app;