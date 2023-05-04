import express from 'express';
import { parseCsv, upload } from '../../middleware/csvParser';
const journey = express.Router();

journey.get('/', (req, res, err) => {
  res.status(200).send('all journeys will be here');
});

journey.get('/:id', (req, res, err) => {
  // get one journey by id
});

journey.post('/', upload, (req, res, err) => {
  if (req.file === undefined) {
    res.status(400).send('Invalid file!');
  } else {
    parseCsv(process.cwd() + '/tmp/uploads/' + req.file.filename);
    res.status(200).send('Successfull upload!')
  }
});

export default journey;