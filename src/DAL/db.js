import { Pool } from "pg";

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASS,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});



module.exports = {
  query: (text, params) => pool.query(text, params),
};

