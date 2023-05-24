import { Request, Response } from "express";
import pool from "../services/db";
import { parseCsv } from '../middleware/csvParser';

export const getAllJourneys = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM journey");
    if (result.rowCount > 0) {
      res.status(200).send({ data: result.rows });
    } else {
      res.status(404).json({ error: 'No journeys found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const addNewJourney = (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).send('No file uploaded!');
  } else if (!req.file.filename) {
    res.status(400).send('Error uploading file!');
  } else {
    parseCsv(process.cwd() + '/tmp/uploads/' + req.file.filename);
    res.status(200).send('Successful upload!');
  }
};

export const getByStartingStation = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM journey WHERE dep_station_id = $1;", [id]);
    res.status(200).send(result.rowCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}