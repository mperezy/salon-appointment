import PG from 'pg';

const POSTGRES_HOST = process.env.PG_HOST ?? '';
const POSTGRES_USER = process.env.PG_USER ?? '';
const POSTGRES_PASSWORD = process.env.PG_PASSWORD ?? '';
const POSTGRES_DB = process.env.PG_DB ?? '';

export default new PG.Pool({
  host: POSTGRES_HOST,
  port: 5432,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
});
