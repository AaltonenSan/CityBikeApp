import { Pool } from 'pg';

// Configure database connection, values to be set in .env file for production!
const pool: Pool = new Pool({
  host: process.env.NODE_ENV === 'production' ? 'database' : 'localhost',
  database: process.env.NODE_ENV === 'test' ? 'citybike_test' : 'citybike',
  user: 'postgres',
  password: 'postgres',
  port: process.env.NODE_ENV == 'production' ? 5432 : 6543,
});

export default pool;
