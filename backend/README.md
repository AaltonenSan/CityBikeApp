# Backend

Backend for the City bike app with TypeScript, Node.js, Express and Dockerized PostgreSQL. <br />
Docker and Docker Compose are needed to run the application.

The docker compose also includes pgAdmin, that can be found on http://localhost:5050

### 3rd party packages used

| Tech                                                   | Usage                    |
| ------------------------------------------------------ | ------------------------ |
| [fast-csv](https://www.npmjs.com/package/fast-csv)     | Parsing csv files        |
| [luxon](https://www.npmjs.com/package/luxon)           | Handling dates and times |
| [Multer](https://www.npmjs.com/package/multer)         | File uploads             |
| [pg](https://www.npmjs.com/package/pg)                 | PostgreSQL client        |
| [pg-promise](https://www.npmjs.com/package/pg-promise) | PostgreSQL interface     |
| [Winston](https://www.npmjs.com/package/winston)       | Logging                  |

## Starting backend in dev mode

### Start the database

```
docker compose up
```

### Run app in dev mode

```
npm run dev
```

## Testing

For the tests there is a docker-compose.test.yml file that will setup the test database and prepopulate it with some data.

### First start the test database

```
docker compose -f docker-compose.test.yml up
```

### Run tests

```
npm run test
```
