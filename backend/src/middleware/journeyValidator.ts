import { DateTime } from "luxon";
import { JourneyCsv } from "../types";

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
const validateJourney = (row: JourneyCsv): boolean => {
  if (Object.keys(row).length !== 8) return false;
  // If all checks are passed returns true
  if (validateJourneyTimes(row.departure, row.arrival)) {
    return (
      isValidInteger(row.dep_station_id, 1) &&
      isValidInteger(row.ret_station_id, 1) &&
      isValidInteger(row.distance, 10) &&
      isValidInteger(row.duration, 10) &&
      row.dep_station_name.length > 0 &&
      row.ret_station_name.length > 0
    );
  }

  return false;
}

export default validateJourney;