import { describe, expect, test } from '@jest/globals'
import validateJourney from '../middleware/journeyValidator';

describe('Verify that valid journeys return true', () => {
  test('Valid journey', () => {
    const validJourney = ['2021-06-30T23:59:36', '2021-07-01T00:06:21',
      '107', 'Tenholantie', '111', 'Esterinportti', '1847', '407'];
    expect(validateJourney(validJourney)).toBeTruthy();
  })
})

describe('Verify that invalid journeys return false', () => {
  test('missing part of data', () => {
    const missingData = ['2021-06-30T23:59:36', '2021-07-01T00:06:21',
      '107', 'Tenholantie', '111', '1847', '407'];
    expect(validateJourney(missingData)).toBeFalsy();
  })
  test('invalid departure date', () => {
    const invalidDepartureDate = ['2021-06-33T23:59:36', '2021-07-01T00:06:21',
      '107', 'Tenholantie', '111', 'Esterinportti', '1847', '407'];
    expect(validateJourney(invalidDepartureDate)).toBeFalsy();
  })
  test('invalid arrival date', () => {
    const invalidArrivalDate = ['2021-06-30T23:59:36', '2021-07-01T00:06',
      '107', 'Tenholantie', '111', 'Esterinportti', '1847', '407'];
    expect(validateJourney(invalidArrivalDate)).toBeFalsy();
  })
  test('arrival before departure', () => {
    const arrivalBeforeDeparture = ['2021-06-30T23:59:36', '2021-06-30T23:59:36',
      '107', 'Tenholantie', '111', 'Esterinportti', '1847', '407'];
    expect(validateJourney(arrivalBeforeDeparture)).toBeFalsy();
  })
  test('journey lasts under 10 seconds', () => {
    const tooShortDuration = ['2021-06-30T23:59:36', '2021-06-30T23:59:45',
      '107', 'Tenholantie', '111', 'Esterinportti', '1847', '9'];
    expect(validateJourney(tooShortDuration)).toBeFalsy();
  })
  test('journey under 10 meters', () => {
    const tooShortDistance = ['2021-06-30T23:21:36', '2021-06-30T23:59:45',
      '107', 'Tenholantie', '111', 'Esterinportti', '7', '90'];
    expect(validateJourney(tooShortDistance)).toBeFalsy();
  })
  test('distance cant be parsed to integer', () => {
    const invalidDistanceDataType = ['2021-06-30T23:59:36', '2021-06-30T23:59:45',
      '107', 'Tenholantie', '111', 'Esterinportti', 'as', '123'];
    expect(validateJourney(invalidDistanceDataType)).toBeFalsy();
  })
  test('departure station id not positive integer', () => {
    const negativeDepartureStationId = ['2021-06-30T23:59:36', '2021-06-30T23:59:45',
      '-107', 'Tenholantie', '111', 'Esterinportti', '1847', '123'];
    expect(validateJourney(negativeDepartureStationId)).toBeFalsy();
  })
})