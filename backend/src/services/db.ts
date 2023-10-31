import { Pool } from "pg";
import dbConfigFile from "../../dbConfig";

type envType = "development" | "production" | "test";

const env = process.env.NODE_ENV as envType;
const dbConfig = dbConfigFile[env];

// Configure database connection, values to be set in .env file for production!
const pool: Pool = new Pool(dbConfig);

export default pool;
