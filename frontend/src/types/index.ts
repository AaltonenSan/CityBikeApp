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

// export interface Journey {

// }