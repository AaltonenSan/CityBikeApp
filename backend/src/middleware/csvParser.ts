import fs from 'fs';
import multer from 'multer';
import validateJourney from './journeyValidator';
import * as fastCsv from 'fast-csv';
import { Journey, Station } from '../types';
import { insertJourneys } from '../controllers/journeyController';
import { insertStations } from '../controllers/stationController';

// Set temporary folder to save uploaded file before processing it
export const upload = multer({ dest: process.cwd() + '/tmp/uploads/' }).single(
  'csvFile'
);

export const parseCsv = (csvUrl: string, filetype: string) => {
  const journeyHeaders = [
    'departure',
    'arrival',
    'dep_station_id',
    'dep_station_name',
    'ret_station_id',
    'ret_station_name',
    'distance',
    'duration',
  ];

  let collectionCsv: Journey[] | Station[] = [];
  let invalidRows: number = 0;

  fs.createReadStream(csvUrl)
    .pipe(
      fastCsv.parse({ headers: filetype === 'journey' ? journeyHeaders : true })
    )
    .on('data', (data: any) => {
      if (filetype === 'journey') {
        if (validateJourney(data)) {
          collectionCsv.push(data);
        } else {
          console.log(data);
          invalidRows++;
        }
      } else {
        collectionCsv.push(data);
      }
    })
    .on('end', async () => {
      try {
        if (filetype === 'journey') {
          console.log(`${invalidRows} invalid rows found in csv file.`);
          await insertJourneys(collectionCsv as Journey[]);
        } else {
          await insertStations(collectionCsv as Station[]);
        }
        fs.unlinkSync(csvUrl);
      } catch (error: any) {
        console.error(error.message);
        throw error;
      }
    });
};
