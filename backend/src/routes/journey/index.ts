import express from 'express';
import { getAllJourneys, uploadJourneys } from '../../controllers/journeyController';
import { upload } from '../../middleware/csvParser';

const journey = express.Router();

// GET all journeys
journey.get('/', getAllJourneys);

// POST upload journey csv
journey.post('/', upload, uploadJourneys);

export default journey;