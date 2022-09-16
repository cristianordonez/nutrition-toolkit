import { Intolerances, User } from '../../types/types';
import { db } from '../database/db';
const generator = require('generate-password');

//# creates a new user and stores in database;
const create = async function (user: User) {
   let currentId = generator.generate({ length: 8, numbers: true });
   let createQuery = `INSERT INTO users (id, username, email,
      spoonacular_username, spoonacular_password, spoonacular_hash, hash)
      VALUES ('${currentId}', '${user.username}', '${user.email}',
       '${user.spoonacular_username}', '${user.spoonacular_password}', '${user.spoonacular_hash}',
        '${user.hash}') RETURNING id`;
   let dbResponse = await db.query(createQuery);
   return dbResponse;
};

//# updates the hashed password in db for user given the userId
const updatePassword = async (userId: string, password: string) => {
   const passwordQuery = `UPDATE users SET hash='${password}' WHERE id='${userId}'`;
   let dbResponse = await db.query(passwordQuery);
   return dbResponse;
};

//# same as creating user except id is already provided by google
const createGoogleUser = async function (user: any) {
   let createQuery = `INSERT INTO users (id, username, email,
      spoonacular_username, spoonacular_password, spoonacular_hash, hash)
      VALUES ('${user.id}', '${user.username}', '${user.email}',
       '${user.spoonacular_username}', '${user.spoonacular_password}', '${user.spoonacular_hash}',
        '${user.hash}') `;
   let dbResponse = await db.query(createQuery);
   return dbResponse;
};

//# creates a new user and stores in database;
const createUserIntolerances = function (intolerances: Intolerances) {
   let dbQuery = `UPDATE users SET intolerances = '{${intolerances.intolerances}}'
   `;
   let result = db.query(dbQuery);

   return result;
};

//# check if user already exists by their email address
const getByEmail = async function (email: string) {
   let getQuery = `SELECT * FROM users WHERE email='${email}'`;
   let user = await db.query(getQuery);
   return user;
};

const getById = async function (id: string) {
   let getQuery = `SELECT * FROM users WHERE id='${id}'`;
   let user = await db.query(getQuery);
   return user;
};

//# retrieves user based on username
const getByUsername = async function (username: string) {
   let getQuery = `SELECT * FROM users WHERE username='${username}'`;
   let user = await db.query(getQuery);
   return user;
};

//# retrieves spoonacular hash based on username
const getHashByUsername = async (username: string) => {
   let getQuery = `SELECT spoonacular_hash FROM users WHERE users.spoonacular_username='${username}'`;
   let hash = await db.query(getQuery);
   return hash;
};

export {
   create,
   updatePassword,
   createGoogleUser,
   createUserIntolerances,
   getByEmail,
   getById,
   getByUsername,
   getHashByUsername,
};
