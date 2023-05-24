import { Request, Response } from 'express';
import pool from '../services/db';

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

export const getOneStation = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await pool.query("SELECT * FROM station WHERE id = $1;", [id])
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