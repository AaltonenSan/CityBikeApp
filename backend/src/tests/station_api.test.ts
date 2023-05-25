import supertest from 'supertest';
import app from '../app';
import { Station } from '../types';
import pool from '../services/db';
const api = supertest(app);

describe('Station API', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM station;')
  });

  test('GET /api/station returns 404 if no stations found', async () => {
    await api
      .get('/api/station')
      .expect(404)
      .expect('Content-Type', /application\/json/);
  });

  test('POST /api/station/new adds new station to database', async () => {
    const newStation: Station = {
      ID: 1,
      Nimi: 'Testi',
      Namn: 'Test',
      Name: 'Test',
      Osoite: 'Testikatu 1',
      Adress: 'Testgatan 1',
      Kaupunki: 'Testikaupunki',
      Stad: 'Teststad',
      Operaattor: 'Testioperaattori',
      Kapasiteet: 1,
      x: 10.15,
      y: 20.25
    }
    const postResponse = await api.post('/api/station/new').send(newStation);

    expect(postResponse.body.id).toEqual(newStation.ID);
    expect(postResponse.body.nimi).toEqual(newStation.Nimi);
  });

  test('GET /api/station returns all stations', async () => {
    const newStation: Station = {
      ID: 1,
      Nimi: 'Testi',
      Namn: 'Test',
      Name: 'Test',
      Osoite: 'Testikatu 1',
      Adress: 'Testgatan 1',
      Kaupunki: 'Testikaupunki',
      Stad: 'Teststad',
      Operaattor: 'Testioperaattori',
      Kapasiteet: 1,
      x: 10.15,
      y: 20.25
    }
    await api.post('/api/station/new').send(newStation);

    const response = await api.get('/api/station');

    expect(response.status).toBe(200);
    expect(response.body.data[0].id).toEqual(newStation.ID);
    expect(response.body.data.length).toBe(1);
  });

  // test('GET /api/station/:id returns single station details by id', async () => {

  // });
  afterAll(async () => {
    await pool.end();
  });
});