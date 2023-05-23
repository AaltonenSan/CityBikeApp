import express from 'express';
import pool from '../../services/db';

const station = express.Router();

station.get('/', async (req, res) => {
  res.send('all stations will be here soonaadadsadas');
});

station.get('/:id', async (req, res) => {
  res.send('get one station!')
});

station.post('/', async (req, res) => {
  try {
    const { id, nimi, namn, name, osoite, adress, kaupunki, stad, operaattor, kapasiteet, x, y } = req.body;

    const insertQuery = `
      INSERT INTO station (id, nimi, namn, name, osoite, adress, kaupunki, stad, operaattor, kapasiteet, x, y)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *`;

    const newTrans = await pool.query(insertQuery, [
      id, nimi, namn, name, osoite, adress, kaupunki, stad, operaattor, kapasiteet, x, y
    ])

    res.json(newTrans.rows[0]);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: 'Error inserting data' });
  }
});

export default station;