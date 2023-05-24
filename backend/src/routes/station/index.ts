import express from 'express';
import { addNewStation, getAllStations, getOneStation } from '../../controllers/stationController'

const station = express.Router();

// GET all stations
station.get('/', getAllStations);

// GET single station by id
station.get('/:id', getOneStation);

// POST a new station
station.post('/', addNewStation);

export default station;