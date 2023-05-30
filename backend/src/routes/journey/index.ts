import express from 'express';
import {
  addJourney,
  getAllJourneys,
  uploadJourneys,
} from '../../controllers/journeyController';
import { upload } from '../../middleware/csvParser';

const journey = express.Router();

// GET all journeys
journey.get('/', getAllJourneys);

// POST upload journey csv
journey.post('/', upload, (req, res) => {
  if (req.file) {
    uploadJourneys(req, res);
  } else {
    addJourney(req, res);
  }
});

export default journey;
