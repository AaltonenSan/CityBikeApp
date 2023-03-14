import express from 'express';

const journey = express.Router();

journey.get('/', (req, res) => {
  res.send('all journeys will be here');
});

journey.get('/:id', (req, res) => {
  // get one journey by id
});

journey.post('/', (req, res) => {
  // save a new journey
});

export default journey;