import { Pool } from "pg";

const pool: Pool = new Pool({
  host: 'localhost',
  database: process.env.NODE_ENV === 'test' ? 'citybike_test' : 'citybike',
  user: 'postgres',
  password: 'postgres',
  port: process.env.NODE_ENV === 'test' ? 7654 : 6543
})

export default pool;