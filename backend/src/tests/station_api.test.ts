import supertest from 'supertest';
import app from '../app';
import pool from '../services/db';
const api = supertest(app);

describe('Station API', () => {
  beforeAll(async () => {
    await pool.query('DELETE FROM STATION WHERE id > 518');
  });

  test('GET /api/station returns all stations', async () => {
    const response = await api.get('/api/station');

    expect(response.body.data.length).toBeGreaterThanOrEqual(10);
    expect(response.headers['content-type']).toContain('application/json');
  });

  test('GET /api/station/:id returns single station calculations', async () => {
    const response = await api.get('/api/station/501');

    expect(response.status).toBe(200);
    expect(response.body.data[0].name).toEqual('Hanasaari');
    expect(response.body.data.length).toBe(1);
  });

  test('GET /api/station/:id returns 404 if station not found', async () => {
    const response = await api.get('/api/station/999999');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('No station found with id 999999');
  });

  test('POST /api/station adds new station to database', async () => {
    await pool.query('DELETE FROM STATION WHERE id = 123');

    const newStation = {
      ID: 123,
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
      y: 20.25,
    };
    const postResponse = await api.post('/api/station').send(newStation);

    expect(postResponse.body.id).toEqual(newStation.ID);
    expect(postResponse.body.nimi).toEqual(newStation.Nimi);
  });

  test('POST /api/station uploads csv file to database', async () => {
    const postResponse = await api
      .post('/api/station')
      .attach('csvFile', 'src/tests/data/stations_test.csv', {
        contentType: 'text/csv',
      });
    expect(postResponse.status).toBe(200);
    expect(postResponse.text).toEqual('Successfully uploaded 5 stations!');

    // Verify that the stations were added to the database
    const getResponse = await api.get('/api/station/525');
    expect(getResponse.body.data[0].name).toEqual('Mäntyviita');
  });

  test('POST /api/station duplicates are not added to database', async () => {
    const response = await api.get('/api/station');
    const initialRows = response.body.data.length;

    await api
      .post('/api/station')
      .attach('csvFile', 'src/tests/data/stations_test.csv', {
        contentType: 'text/csv',
      });

    const response2 = await api.get('/api/station');
    const finalRows = response2.body.data.length;

    expect(initialRows).toEqual(finalRows);
  });

  afterAll(async () => {
    await pool.end();
  });
});
