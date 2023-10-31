# Helsinki City Bikes

The aim of this project is to develop a web application that showcases information related to journeys made using Helsinki city bikes and city bike stations. The application sources its data from provided datasets and was intended for the [pre-assignment of Solita Dev Academy](https://github.com/solita/dev-academy-2023-exercise).

The application is written with TypeScript and uses React for the frontend and Node + Express with PostgreSQL for the backend. The whole application is Dockerized for easy setup.

## Setup

### Copy the repository

```
git clone https://github.com/AaltonenSan/CityBikeApp.git
```

### Start the application

The application can be started with following commands in the projet root directory:

```
docker compose build
```

Followed by:

```
docker compose up
```

After Docker has started the application it should be running on <http://localhost:3000>

Instructions on running the BE and FE separately can be found in their own README files.

### Datasets

Journey datasets. The data is owned by City Bike Finland.

- <https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv>
- <https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv>
- <https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv>

And a dataset of the stations. [License](https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902)

- <https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv>

### Import datasets to database

The application obviously needs some data to showcase the usage, so download atleast the [stations](https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv) file and one journey file from above.

After that the files need to be posted to the server. I prefer to use Postman for this. Importing the journeys can take a while as the dataset is quite large and the rows are validated before being inserted to database.

Post the datasets to given endpoints. Add the file to the body of the request as form-data.

- <b>Station dataset -> POST localhost:3001/api/station/ </b>
- <b>Journey datasets -> POST localhost:3001/api/journey/ </b>

| Key     | Value            |
| ------- | ---------------- |
| csvFile | the dataset file |

![Postman instructions](backend/images/stations_post.png)

## Assignment

I got all the recommended features done and most of the additional ones too. Due to time running out some additional features were left undone.

Features to improve and add:

- Journey - Ordering per column
- Journey - Searching
- Journey - Filtering
- Ability to add new journeys or stations from the UI
- E2E testing
