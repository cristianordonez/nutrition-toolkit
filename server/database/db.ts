require('dotenv').config();

let database =
   process.env.NODE_ENV === 'test' ? 'test_database' : 'the_macro_trainer';

const pgp = require('pg-promise')();

const cn = {
   user: process.env.DATABASE_USER,
   host: process.env.DATABASE_HOST,
   database: database,
   password: process.env.DATABASE_PASSWORD,
   port: 5432,
};

// Creating a new database instance from the connection details:
export const db = pgp(cn);
