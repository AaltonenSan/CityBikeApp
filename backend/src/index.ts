import app from './app';
import { logger } from './utils/logger';

const port = process.env.PORT || 3001;
try {
  app.listen(port, (): void => {
    logger.info(`Backend running on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
