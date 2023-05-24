export interface Journey {
  departure: Date,
  arrival: Date,
  dep_station_id: number,
  dep_station_name: string,
  ret_station_id: number,
  ret_station_name: string,
  distance: number,
  duration: number
}

export interface JourneyCsv {
  departure: string,
  arrival: string,
  dep_station_id: string,
  dep_station_name: string,
  ret_station_id: string,
  ret_station_name: string,
  distance: string,
  duration: string
}

export interface Station {
  FID: number,
  ID: number,
  Nimi: string,
  Namn: string,
  Name: string,
  Osoite: string,
  Adress: string,
  Kaupunki: string,
  Stad: string,
  Operaattor: string,
  Kapasiteet: number,
  x: number,
  y: number
}

export interface StationJourneys {
  journeys_started: number;
  journeys_ended: number;
  avg_distance_started?: number;
  avg_distance_ended?: number;
}