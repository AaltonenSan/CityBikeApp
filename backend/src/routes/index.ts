import express from 'express';
import journey from './journey.js';
import station from './station.js';

const router = express.Router();

router.use('/journey', journey);
router.use('/station', station);

export default router;