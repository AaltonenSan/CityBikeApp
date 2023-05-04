export interface Journey {
  departure: Date,
  arrival: Date,
  departureStationId: number,
  departureStationName: string,
  targetStationId: number,
  targetStationName: string,
  distance: number,
  duration: number
}

export interface Station {
  fid: number,
  id: number,
  nameFi: string,
  nameSw: string,
  addressFi: string,
  addressSw: string,
  cityFi: string,
  citySw: string,
  operator: string,
  capasity: number,
  coordX: number,
  coordY: number
}
