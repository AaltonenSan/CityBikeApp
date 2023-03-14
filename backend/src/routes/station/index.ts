import express from 'express';

const station = express.Router();

station.get('/', (req, res) => {
  res.send('all stations will be here');
});

station.get('/:id', (req, res) => {
  // get one station by id
});

station.post('/', (req, res) => {
  // save a new station
});

export default station;