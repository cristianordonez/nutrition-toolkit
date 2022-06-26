//# connects controllers to the database

import { pool } from '../database/db';

type User = {
   username: string;
   firstName: string;
   lastName: string;
   email: string;
   spoonacular_username: string;
   spoonacular_password: string;
   spoonacular_hash: string;
   hash: string;
};

//creates a new user and stores in database;
const create = async function (user: User) {
   const createQuery = `INSERT INTO users (username, first_name, last_name, email,
      spoonacular_username, spoonacular_password, spoonacular_hash, hash)
      VALUES ('${user.username}', '${user.firstName}', '${user.lastName}', '${user.email}',
       '${user.spoonacular_username}', '${user.spoonacular_password}', '${user.spoonacular_hash}',
        '${user.hash}')`;
   let dbResponse = await pool.query(createQuery);
   console.log('dbResponse:', dbResponse);
   return dbResponse;
};

//check if user already exists by their email address
const getByEmail = async function (email: string) {
   const getQuery = `SELECT * FROM users WHERE email='${email}'`;
   let user = await pool.query(getQuery);
   console.log('user in get by email :', user);
   return user;
};

const getByUsername = async function (username: string) {
   const getQuery = `SELECT * FROM users WHERE username='${username}'`;
   let user = await pool.query(getQuery);
   console.log('user:', user);
   return user;
};

export { create, getByEmail, getByUsername };
