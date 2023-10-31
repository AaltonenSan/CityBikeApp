export default {
  production: {
    host: "database",
    database: "citybike",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432,
  },
  development: {
    host: "localhost",
    database: "citybike",
    user: "postgres",
    password: "postgres",
    port: 5432,
  },
  test: {
    host: "localhost",
    database: "citybike_test",
    user: "postgres",
    password: "postgres",
    port: 6543,
  },
};
