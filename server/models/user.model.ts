//# connects controllers to the database

import { pool } from '../database/db';
import { RowDataPacket } from 'mysql2';

type User = {
   username: string;
   firstName: string;
   lastName: string;
   email: string;
   spoonacular_username: string;
   spoonacular_password: string;
   spoonacular_hash: string;
   hash: string;
   id_user: string;
};

//creates a new user and stores in database;
const create = async function (user: User) {
   const createQuery = `INSERT INTO users (username, first_name, last_name, email, spoonacular_username, spoonacular_password, spoonacular_hash, hash, id_user) VALUES ('${user.username}', '${user.firstName}', '${user.lastName}', '${user.email}', '${user.spoonacular_username}', '${user.spoonacular_password}', '${user.spoonacular_hash}', '${user.hash}', '${user.id_user}')`;
   let dbResponse = await pool.promise().query<RowDataPacket[]>(createQuery);
   console.log('dbResponse:', dbResponse);
   return dbResponse;
};

//check if user already exists by their email address
const getByEmail = async function (email: string) {
   const getQuery = `SELECT * FROM USERS WHERE email='${email}'`;
   let user = await pool.promise().query<RowDataPacket[]>(getQuery);
   return user;
};

const getByUsername = async function (username: string) {
   const getQuery = `SELECT * FROM USERS WHERE username='${username}'`;
   let user = await pool.promise().query<RowDataPacket[]>(getQuery);
   return user;
};

export { create, getByEmail, getByUsername };
