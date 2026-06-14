import * as dotenv from 'dotenv';
dotenv.config();

import pgPromise from 'pg-promise';
const pgp = pgPromise({});

const cn = {
   user: process.env.DATABASE_USER,
   host: process.env.DATABASE_HOST,
   database: process.env.DATABASE_NAME,
   password: process.env.DATABASE_PASSWORD,
   port: 5432,
};

// Creating a new database instance from the connection details:
export const db = pgp(cn);
