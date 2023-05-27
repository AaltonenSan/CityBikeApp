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

// POST upload stations csv
station.post('/', upload, uploadStations);

// POST add new station
station.post('/new', addNewStation);

export default station;
