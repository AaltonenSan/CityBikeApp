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

