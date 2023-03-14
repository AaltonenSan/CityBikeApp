import { describe, expect, test } from '@jest/globals'
import validateJourney from '../middleware/journeyValidator';

describe('Verify that journey validator', () => {
  const validJourney = [
    "2021 - 06 - 30T23: 59: 36",
    "2021 - 07 - 01T00: 06: 21",
    "107",
    "Tenholantie",
    "111",
    "Esterinportti",
    "1847",
    "407"
  ]

  test('returns true if journey is valid', () => {
    expect(validateJourney(validJourney)).toBeTruthy();
  })
})