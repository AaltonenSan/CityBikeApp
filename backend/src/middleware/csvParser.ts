import fs from 'fs';
import multer from 'multer';
import validateJourney from './journeyValidator';
import * as fastCsv from 'fast-csv';
import { Journey, Station } from '../types';

// Set temporary folder to save uploaded file before processing it
export const upload = multer({ dest: process.cwd() + '/tmp/uploads/' }).single('csvFile');

export const parseCsv = (csvUrl: string) => {
  let collectionCsv: Journey[] | Station[] = [];

  fs.createReadStream(csvUrl)
    .pipe(fastCsv.parse())
    .on('data', (data: any) => {
      console.log(data)
      if (validateJourney(data)) {
        collectionCsv.push(data)
      }
    })
    .on('end', () => {
      console.table(collectionCsv)
      fs.unlinkSync(csvUrl);
    })
}
