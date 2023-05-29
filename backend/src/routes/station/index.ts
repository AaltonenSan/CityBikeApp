import express from 'express';
import {
  addNewStation,
  getAllStations,
  getOneStation,
  uploadStations,
} from '../../controllers/stationController';
import { upload } from '../../middleware/csvParser';

const station = express.Router();

// GET all stations
station.get('/', getAllStations);

// GET single station by id
station.get('/:id', getOneStation);

// POST upload stations csv or add new station as json
station.post('/', upload, (req, res) => {
  if (req.file) {
    uploadStations(req, res);
  } else {
    addNewStation(req, res);
  }
});

export default station;
