import { Pool, Client } from 'pg';
const db = process.env.NODE_ENV === 'test' ? 'mealplans-test' : 'mealplans';

console.log('db:', db);
export const pool = new Pool({
   user: process.env.USER,
   host: process.env.HOST,
   database: db,
   password: process.env.PASSWORD,
   port: 5432,
});
