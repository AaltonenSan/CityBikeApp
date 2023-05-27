import axios from 'axios';
import {
  StationResponseData,
  JourneyResponseData,
  StationDetailsResponse,
  JourneyCountResponse,
} from '../types';

// GET list of all stations
export const getAllStations = async () => {
  const { data } = await axios.get<StationResponseData>(
    'http://localhost:3001/api/station'
  );
  return data;
};

// GET list of all journeys
export const getAllJourneys = async (page?: number) => {
  const { data } = await axios.get<JourneyResponseData>(
    'http://localhost:3001/api/journey?page=' + page
  );
  return data;
};

// GET count of all journeys for pagination
export const getJourneyCount = async () => {
  const { data } = await axios.get<JourneyCountResponse>(
    'http://localhost:3001/api/journey/count'
  );
  return data;
};

/**
 * GET info for one station
 * @param id station.id
 */
export const getOneStation = async (id: number) => {
  const { data } = await axios.get<StationDetailsResponse>(
    `http://localhost:3001/api/station/${id}`
  );
  return data;
};
