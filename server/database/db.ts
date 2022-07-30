require('dotenv').config();
let database = process.env.NODE_ENV === 'test' ? 'mealplans_test' : 'mealplans';

console.log('proccess.env.node_env in db.ts', process.env.NODE_ENV);

const pgp = require('pg-promise')();

const cn = {
   user: process.env.USER,
   host: process.env.HOST,
   database: database,
   password: process.env.PASSWORD,
   port: 5432,
};

// Creating a new database instance from the connection details:
export const db = pgp(cn);
