import supertest from 'supertest';
import app from '../app';
import pool from '../services/db';
import { Journey, JourneyCsv } from '../types';
const api = supertest(app);

describe('Journey API', () => {
  // Delete all rows added by previous test runs
  beforeAll(async () => {
    await pool.query('DELETE FROM JOURNEY WHERE id > 97');
  });

  test('GET /api/journey returns first 15 journeys', async () => {
    const response = await api.get('/api/journey');

    // Check that response has 15 journeys as pagination is set to 15
    expect(response.body.data.length).toBe(15);
    expect(response.headers['content-type']).toContain('application/json');
  });

  test('GET /api/journey returns next page after page is given as parameter', async () => {
    const firstPage = await api.get('/api/journey');
    const secondPage = await api.get('/api/journey?page=2');

    // Check that response has 15 journeys as pagination is set to 15
    expect(secondPage.body.data.length).toBe(15);

    // Check that none of the journeys in the second page are present in the first page
    for (const journey of secondPage.body.data) {
      const journeyFound = firstPage.body.data.some(
        (item: Journey) => item === journey
      );
      expect(journeyFound).toBe(false);
    }
  });

  test('POST /api/journey uploads csv file to database', async () => {
    const postResponse = await api
      .post('/api/journey')
      .attach('csvFile', 'src/tests/data/journeys_upload_test.csv', {
        contentType: 'text/csv',
      });
    expect(postResponse.status).toBe(200);
    expect(postResponse.text).toEqual('Successfully uploaded 17 journeys!');
  });

  afterAll(async () => {
    await pool.end();
  });

  test('POST /api/journey adds new journey to database', async () => {
    const newJourney: JourneyCsv = {
      departure: '2021-08-01T15:22:12',
      arrival: '2021-08-01T15:34:15',
      dep_station_id: '800',
      dep_station_name: 'testi',
      ret_station_id: '801',
      ret_station_name: 'testi',
      distance: '4181',
      duration: '723',
    };
    const postResponse = await api.post('/api/journey').send(newJourney);

    expect(postResponse.status).toBe(200);
    expect(postResponse.body.data.dep_station_name).toEqual(
      newJourney.dep_station_name
    );
  });

  test('POST /api/journey returns 400 if journey is invalid', async () => {
    const newJourney = {
      departure: '2021-08-01T15:22:12',
      arrival: '2021-08-01T15:34:15',
      dep_station_name: 'Hanasaari',
      ret_station_id: '507',
      ret_station_name: 'Golfpolku',
      distance: '4181',
      duration: '723',
    };
    const postResponse = await api.post('/api/journey').send(newJourney);

    expect(postResponse.status).toBe(400);
    expect(postResponse.body.error).toBe('Invalid journey data');
  });
});
