import express from 'express';
import { addNewJourney, getAllJourneys } from '../../controllers/journeyController';
import { upload } from '../../middleware/csvParser';
const journey = express.Router();

// GET all journeys
journey.get('/', getAllJourneys);

// POST a new journey
journey.post('/', upload, addNewJourney);

export default journey;