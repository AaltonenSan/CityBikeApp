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
  let validRows: number = 0;

  console.log(
    filetype === 'journey'
      ? 'Parsing and validating journey csv...'
      : 'Parsing station csv...'
  );

  fs.createReadStream(csvUrl)
    .pipe(
      fastCsv.parse({ headers: filetype === 'journey' ? journeyHeaders : true })
    )
    .on('data', async (data: any) => {
      if (filetype === 'journey') {
        if (validateJourney(data)) {
          collectionCsv.push(data);
          validRows++;
          if (validRows === 100_000) {
            await insertJourneys(collectionCsv as Journey[]);
            collectionCsv = [];
            validRows = 0;
            console.log('Parsing and validating journey csv...');
          }
        } else {
          invalidRows++;
        }
      } else {
        collectionCsv.push(data);
      }
    })
    .on('end', async () => {
      try {
        if (filetype === 'journey') {
          await insertJourneys(collectionCsv as Journey[]);
          console.log('Journeys inserted to database.');
          console.log(`${invalidRows} invalid rows found in csv file.`);
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
