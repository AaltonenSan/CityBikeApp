COPY station(fid, id, nimi, namn, name, osoite, adress, kaupunki, stad, operaattor, kapasiteet, x, y) FROM '/data/stations.csv' DELIMITER ',' CSV HEADER;


-- Set sequence to start from 11 after manually adding 10 stations
SELECT SETVAL('station_fid_seq', 11);