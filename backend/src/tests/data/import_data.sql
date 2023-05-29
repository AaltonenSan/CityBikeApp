COPY station(fid, id, nimi, namn, name, osoite, adress, kaupunki, stad, operaattor, kapasiteet, x, y) FROM '/data/stations.csv' DELIMITER ',' CSV HEADER;
COPY journey(departure, return_time, dep_station_id, dep_station_name, ret_station_id, ret_station_name, distance, duration) FROM '/data/journeys.csv' DELIMITER ',' CSV HEADER;

-- Set station sequence to start from 11 after manually adding 10 stations
SELECT SETVAL('station_fid_seq', 11);

-- Set journey sequence to start from 99 after manually adding 98 journeys
SELECT SETVAL('journey_id_seq', 99);