import { Request, Response } from 'express';
import pool from '../services/db';
import { parseCsv } from '../middleware/csvParser';
import { Station } from '../types';
import pgPromise from 'pg-promise';

// initialize pg-promise
const db = pgPromise();

// GET all stations
export const getAllStations = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM station;');
    if (result.rowCount > 0) {
      res.status(200).send({ data: result.rows });
    } else {
      res.status(404).json({ error: 'No stations found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// GET single station details by id
export const getOneStation = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const selectQuery = `
    SELECT
      s.nimi AS station_name,
      COUNT(DISTINCT j.id) AS journeys_started,
      COUNT(DISTINCT j2.id) AS journeys_ended,
      AVG(CASE WHEN j.dep_station_id = s.id THEN j.distance END) AS avg_distance_started,
      AVG(CASE WHEN j.ret_station_id = s.id THEN j.distance END) AS avg_distance_ended
    FROM
      station s
    LEFT JOIN
      journey j ON j.dep_station_id = s.id
    LEFT JOIN
      journey j2 ON j2.ret_station_id = s.id
    WHERE
      s.id = $1
    GROUP BY
      s.nimi, s.id;`

    const result = await pool.query(selectQuery, [id])
    console.log(result)

    if (result.rowCount > 0) {
      res.status(200).send({ data: result.rows });
    } else {
      res.status(404).json({ error: `No station found with id ${id}` })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

// POST add new station to database
export const addNewStation = async (req: Request, res: Response) => {
  try {
    const {
      id, nimi, namn,
      name, osoite, adress,
      kaupunki, stad, operaattor,
      kapasiteet, x, y
    } = req.body;

    const insertQuery = `
      INSERT INTO station (id, nimi, namn, name, osoite, adress, kaupunki, stad, operaattor, kapasiteet, x, y)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *`;

    const insertResult = await pool.query(insertQuery, [
      id, nimi, namn, name, osoite, adress, kaupunki, stad, operaattor, kapasiteet, x, y
    ])
    res.json(insertResult.rows[0]);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: 'Error inserting data' });
  }
}

// POST csv file to server
export const uploadStations = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).send('No file uploaded!');
  } else if (!req.file.filename) {
    res.status(400).send('Error uploading file!');
  } else {
    parseCsv(process.cwd() + '/tmp/uploads/' + req.file.filename, 'station');
    res.status(200).send('Successful upload!');
  }
}

// Insert stations from csv file to database after parsing
export const insertStations = async (stations: Station[]) => {
  try {
    const client = await pool.connect();
    const stationColumnSet = new db.helpers.ColumnSet([
      'id',
      'nimi',
      'namn',
      'name',
      'osoite',
      'adress',
      'kaupunki',
      'stad',
      'operaattor',
      'kapasiteet',
      'x',
      'y'
    ], { table: 'station' });

    const values = stations.map(station => ({
      id: station.ID,
      nimi: station.Nimi,
      namn: station.Namn,
      name: station.Name,
      osoite: station.Osoite,
      adress: station.Adress,
      kaupunki: station.Kaupunki,
      stad: station.Stad,
      operaattor: station.Operaattor,
      kapasiteet: station.Kapasiteet,
      x: station.x,
      y: station.y
    }));

    const query = db.helpers.insert(values, stationColumnSet) + 'ON CONFLICT DO NOTHING';
    const result = await client.query(query);
    const rowCount = result.rowCount;

    client.release();
    console.log(`Successfully inserted ${rowCount} stations`)
  } catch (error) {
    console.error(error);
  }
}
