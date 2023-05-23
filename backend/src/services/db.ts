import { Pool } from "pg";

const pool: Pool = new Pool({
  host: process.env.DB_URL || undefined,
  database: 'citybike',
  user: process.env.DB_USER || undefined,
  password: process.env.DB_PASSWORD || undefined,
  port: 5432
})

export default pool;