import axios from 'axios';
import { StationResponseData, JourneyResponseData } from '../types';

// GET list of all stations
export const getAllStations = async () => {
  const response = await axios.get('http://localhost:3001/api/station');
  const data: StationResponseData = await response.data;
  return data;
};

// GET list of all journeys
export const getAllJourneys = async () => {
  const response = await axios.get('http://localhost:3001/api/journey');
  const data: JourneyResponseData = await response.data;
  return data;
};

/**
 * GET info for one station
 * @param id station.id
 */
export const getOneStation = async (id: number) => {
  const response = await axios.get(`http://localhost:3001/api/station/${id}`);
  const data: StationResponseData = await response.data;
  return data;
};
