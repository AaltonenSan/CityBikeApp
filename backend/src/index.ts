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
  logger.info(`${req.method} ${req.url}`);
  next();
})

// Log outgoing responses
app.use((req: Request, res: Response, next: Function) => {
  res.on('finish', () => {
    logger.info(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`)
  });
  next();
})

// for testing only
app.get('/', (req, res) => {
  res.status(200).send('Hello from node express backend!');
});

app.use('/api', router);

const port = process.env.PORT || 3001;
try {
  app.listen(port, (): void => {
    logger.info(`Backend running on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}