import { Request, Response } from 'express';
import pool from '../services/db';
import { parseCsv } from '../middleware/csvParser';
import { Journey } from '../types';
import pgPromise from 'pg-promise';
import { DateTime } from 'luxon';

// initialize pg-promise
const db = pgPromise();

// GET all journeys and count for pagination
export const getAllJourneys = async (req: Request, res: Response) => {
  const rowsPerPage = 15;
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const offset = (page - 1) * rowsPerPage;

  try {
    const query = `
    SELECT * FROM journey
    ORDER BY id
    LIMIT $1
    OFFSET $2
    `;
    const values = [rowsPerPage, offset];
    const result = await pool.query(query, values);

    if (result.rowCount > 0) {
      result.rows.forEach((row) => {
        row.departure = DateTime.fromJSDate(row.departure).toFormat(
          'yyyy-MM-dd HH:mm:ss'
        );
        row.return_time = DateTime.fromJSDate(row.return_time).toFormat(
          'yyyy-MM-dd HH:mm:ss'
        );
      });
      // if page is 1, also get total count of journeys
      if (page === 1) {
        const countQuery = `
        SELECT COUNT(*) AS total_count 
        FROM journey
        `;
        const countResult = await pool.query(countQuery);
        const lastPage = Math.ceil(
          countResult.rows[0].total_count / rowsPerPage
        );

        res.status(200).send({
          data: result.rows,
          last_page: lastPage,
        });
      } else {
        res.status(200).send({ data: result.rows });
      }
    } else {
      res.status(404).json({ error: 'No journeys found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// POST csv file to server
export const uploadJourneys = (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).send('No file uploaded!');
  } else if (!req.file.filename) {
    res.status(400).send('Error uploading file!');
  } else {
    parseCsv(process.cwd() + '/tmp/uploads/' + req.file.filename, 'journey');
    res.status(200).send('Successful upload!');
  }
};

// Insert journeys from csv file to database after parsing and validating
export const insertJourneys = async (journeys: Journey[]) => {
  console.log('Inserting journeys to database...');
  try {
    const client = await pool.connect();
    const journeyColumnSet = new db.helpers.ColumnSet(
      [
        'departure',
        'return_time',
        'dep_station_id',
        'dep_station_name',
        'ret_station_id',
        'ret_station_name',
        'distance',
        'duration',
      ],
      { table: 'journey' }
    );

    const values = journeys.map((journey) => ({
      departure: journey.departure,
      return_time: journey.arrival,
      dep_station_id: journey.dep_station_id,
      dep_station_name: journey.dep_station_name,
      ret_station_id: journey.ret_station_id,
      ret_station_name: journey.ret_station_name,
      distance: journey.distance,
      duration: journey.duration,
    }));

    const query =
      db.helpers.insert(values, journeyColumnSet) + 'ON CONFLICT DO NOTHING';

    const result = await client.query(query);
    const rowCount = result.rowCount;
    client.release();
    console.log(`Succesfully inserted ${rowCount} journeys`);
    return rowCount;
  } catch (error) {
    console.error(error);
  }
};
