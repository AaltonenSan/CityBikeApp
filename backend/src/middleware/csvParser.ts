import fs from 'fs';
import multer from 'multer';
import * as csv from 'fast-csv';
import { Journey } from '../data/journey';
import validateJourney from './journeyValidator';

// Set temporary folder to save uploaded file before processing it
export const upload = multer({ dest: process.cwd() + '/tmp/uploads/' }).single('csvFile');

export const parseCsv = (csvUrl: string) => {
  let stream = fs.createReadStream(csvUrl);
  let collectionCsv: any[] = [];
  let csvFileStream = csv
    .parse()
    .on('data', data => {
      if (validateJourney(data)) {
        collectionCsv.push(data)
      }
    })
    .on('end', () => {
      console.table(collectionCsv)
      fs.unlinkSync(csvUrl);
    })
  stream.pipe(csvFileStream);
}
