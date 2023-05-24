DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'citybike') THEN
    CREATE DATABASE citybike;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS station (
  fid         SERIAL PRIMARY KEY,
  id          int UNIQUE,
  nimi        varchar(100),
  namn        varchar(100),
  name        varchar(100),
  osoite      varchar(100),
  adress      varchar(100),
  kaupunki    varchar(100),
  stad        varchar(100),
  operaattor  varchar(100),
  kapasiteet  int,
  x           numeric,
  y           numeric
);

CREATE TABLE IF NOT EXISTS journey (
  id                  SERIAL PRIMARY KEY,
  departure           timestamp,
  return_time         timestamp,
  dep_station_id      int,
  dep_station_name    varchar(100),
  ret_station_id      int,
  ret_station_name    varchar(100),
  distance            int,
  duration            int
);
