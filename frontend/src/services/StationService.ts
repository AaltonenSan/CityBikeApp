import axios from "axios"
import { StationResponseData } from "../types"

export const getAllStations = async () => {
  const response = await axios.get('http://localhost:3001/api/station')
  const data: StationResponseData = await response.data
  return data
}

export const getOneStation = async (id: number) => {
  const response = await axios.get(`http://localhost:3001/api/station/${id}`)
  const data: StationResponseData = await response.data
  return data
}