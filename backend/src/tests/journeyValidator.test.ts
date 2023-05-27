import { describe, expect, test } from '@jest/globals';
import validateJourney from '../middleware/journeyValidator';
import { JourneyCsv } from '../types';

describe('Verify that valid journeys return true', () => {
  test('Valid journey', () => {
    const validJourney: JourneyCsv = {
      departure: '2021-06-30T23:59:36',
      arrival: '2021-07-01T00:06:21',
      dep_station_id: '107',
      dep_station_name: 'Tenholantie',
      ret_station_id: '111',
      ret_station_name: 'Esterinportti',
      distance: '1847',
      duration: '407',
    };
    expect(validateJourney(validJourney)).toBeTruthy();
  });
});

describe('Verify that invalid journeys return false', () => {
  test('missing part of data', () => {
    const missingData: JourneyCsv = {
      departure: '2021-06-30T23:59:36',
      arrival: '2021-07-01T00:06:21',
      dep_station_id: '107',
      dep_station_name: 'Tenholantie',
      ret_station_id: '111',
      ret_station_name: '',
      distance: '1847',
      duration: '407',
    };
    expect(validateJourney(missingData)).toBeFalsy();
  });
  test('invalid departure date', () => {
    const invalidDepartureDate: JourneyCsv = {
      departure: '2021-06-33T23:59:36',
      arrival: '2021-07-01T00:06:21',
      dep_station_id: '107',
      dep_station_name: 'Tenholantie',
      ret_station_id: '111',
      ret_station_name: 'Esterinportti',
      distance: '1847',
      duration: '407',
    };
    expect(validateJourney(invalidDepartureDate)).toBeFalsy();
  });
  test('invalid arrival date', () => {
    const invalidArrivalDate: JourneyCsv = {
      departure: '2021-06-33T23:59:36',
      arrival: '2021-07-01T00:06',
      dep_station_id: '107',
      dep_station_name: 'Tenholantie',
      ret_station_id: '111',
      ret_station_name: 'Esterinportti',
      distance: '1847',
      duration: '407',
    };
    expect(validateJourney(invalidArrivalDate)).toBeFalsy();
  });
  test('arrival before departure', () => {
    const arrivalBeforeDeparture: JourneyCsv = {
      departure: '2021-06-30T23:59:36',
      arrival: '2021-06-30T23:59:36',
      dep_station_id: '107',
      dep_station_name: 'Tenholantie',
      ret_station_id: '111',
      ret_station_name: 'Esterinportti',
      distance: '1847',
      duration: '407',
    };
    expect(validateJourney(arrivalBeforeDeparture)).toBeFalsy();
  });
  test('journey lasts under 10 seconds', () => {
    const tooShortDuration: JourneyCsv = {
      departure: '2021-06-30T23:59:36',
      arrival: '2021-06-30T23:59:45',
      dep_station_id: '107',
      dep_station_name: 'Tenholantie',
      ret_station_id: '111',
      ret_station_name: 'Esterinportti',
      distance: '1847',
      duration: '9',
    };
    expect(validateJourney(tooShortDuration)).toBeFalsy();
  });
  test('journey under 10 meters', () => {
    const tooShortDistance: JourneyCsv = {
      departure: '2021-06-30T23:21:36',
      arrival: '2021-06-30T23:59:45',
      dep_station_id: '107',
      dep_station_name: 'Tenholantie',
      ret_station_id: '111',
      ret_station_name: 'Esterinportti',
      distance: '7',
      duration: '90',
    };
    expect(validateJourney(tooShortDistance)).toBeFalsy();
  });
  test('distance cant be parsed to integer', () => {
    const invalidDistanceDataType: JourneyCsv = {
      departure: '2021-06-30T23:59:36',
      arrival: '2021-06-30T23:59:45',
      dep_station_id: '107',
      dep_station_name: 'Tenholantie',
      ret_station_id: '111',
      ret_station_name: 'Esterinportti',
      distance: 'as',
      duration: '123',
    };
    expect(validateJourney(invalidDistanceDataType)).toBeFalsy();
  });
  test('departure station id not positive integer', () => {
    const negativeDepartureStationId: JourneyCsv = {
      departure: '2021-06-30T23:59:36',
      arrival: '2021-06-30T23:59:45',
      dep_station_id: '-107',
      dep_station_name: 'Tenholantie',
      ret_station_id: '111',
      ret_station_name: 'Esterinportti',
      distance: '1847',
      duration: '123',
    };
    expect(validateJourney(negativeDepartureStationId)).toBeFalsy();
  });
});
