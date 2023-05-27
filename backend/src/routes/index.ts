import express from 'express';
import journey from './journey/index';
import station from './station/index';

const router = express.Router();

router.use('/journey', journey);
router.use('/station', station);

export default router;
