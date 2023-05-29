import fs from 'fs';
import multer from 'multer';
import validateJourney from './journeyValidator';
import * as fastCsv from 'fast-csv';
import { Journey, Station } from '../types';
import { insertJourneys } from '../controllers/journeyController';
import { insertStations } from '../controllers/stationController';
import { debugLogger } from '../utils/logger';

// Set temporary folder to save uploaded file before processing it
export const upload = multer({ dest: process.cwd() + '/tmp/uploads/' }).single(
  'csvFile'
);

export const parseCsv = (csvUrl: string, filetype: string): Promise<number> => {
  return new Promise<number>(async (resolve, reject) => {
    let rowCount: number = 0;
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

    debugLogger.debug(
      filetype === 'journey'
        ? 'Parsing and validating journey csv...'
        : 'Parsing station csv...'
    );

    fs.createReadStream(csvUrl)
      .pipe(
        fastCsv.parse({
          headers: filetype === 'journey' ? journeyHeaders : true,
        })
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
              debugLogger.debug('Parsing and validating journey csv...');
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
            const rows = await insertJourneys(collectionCsv as Journey[]);
            debugLogger.debug('Journeys inserted to database.');
            debugLogger.debug(`${invalidRows} invalid rows found in csv file.`);
            rowCount = rows || 0;
          } else {
            const rows = await insertStations(collectionCsv as Station[]);
            rowCount = rows || 0;
          }
          fs.unlinkSync(csvUrl);
          resolve(rowCount);
        } catch (error: any) {
          console.error(error.message);
          reject(error);
        }
      });
  });
};
