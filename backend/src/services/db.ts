import { Pool } from "pg";

const pool: Pool = new Pool({
  host: 'localhost',
  database: 'citybike',
  user: 'postgres',
  password: 'postgres',
  port: 6543
})

export default pool;