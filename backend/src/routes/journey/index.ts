import express from 'express';
import {
  getAllJourneys,
  getJourneyCount,
  uploadJourneys,
} from '../../controllers/journeyController';
import { upload } from '../../middleware/csvParser';

const journey = express.Router();

// GET all journeys
journey.get('/', getAllJourneys);

// GET journey count for pagination
journey.get('/count', getJourneyCount);

// POST upload journey csv
journey.post('/', upload, uploadJourneys);

export default journey;
