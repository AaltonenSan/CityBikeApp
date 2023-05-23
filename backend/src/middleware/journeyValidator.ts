import { DateTime } from "luxon";

const validateJourneyTimes = (departure: string, arrival: string): boolean => {
  const formatString = "yyyy-MM-dd'T'HH:mm:ss";
  const departureTime = DateTime.fromFormat(departure, formatString);
  const arrivalTime = DateTime.fromFormat(arrival, formatString);

  return (
    departureTime.isValid &&
    arrivalTime.isValid &&
    departureTime < arrivalTime
  );
}

const isValidInteger = (value: string, limit: number): boolean => {
  if (!Number.isInteger(+value)) {
    return false;
  }
  if (+value < limit) {
    return false;
  }
  return true;
}

/** 
 * Validate CSV row to be a valid City Bike journey, returns true or false
 */
const validateJourney = (row: string[]): boolean => {
  if (row.length !== 8) return false;
  const [departure, arrival, departureStationId, departureStationName, targetStationId, targetStationName, distance, duration] = row;

  // If all checks are passed returns true
  if (validateJourneyTimes(departure, arrival)) {
    return (
      isValidInteger(departureStationId, 1) &&
      isValidInteger(targetStationId, 1) &&
      isValidInteger(distance, 10) &&
      isValidInteger(duration, 10)
    );
  }

  return false;
}

export default validateJourney;