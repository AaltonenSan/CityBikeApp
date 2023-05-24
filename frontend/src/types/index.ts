export interface Station {
  fid: number,
  id: number,
  nimi: string,
  namn: string,
  name: string,
  osoite: string,
  adress: string,
  kaupunki: string,
  stad: string,
  operaattor: string,
  kapasiteet: number,
  x: number,
  y: number
}

export interface StationResponseData {
  data: Station[]
}

export interface Journey {
  departure: string,
  return_time: string,
  dep_station_id: number,
  dep_station_name: string,
  ret_station_id: number,
  ret_station_name: string,
  distance: number,
  duration: number
}

export interface JourneyResponseData {
  data: Journey[]
}