import { db } from '../database/db';
const generator = require('generate-password');

type User = {
   username: string;
   email: string;
   spoonacular_username: string;
   spoonacular_password: string;
   spoonacular_hash: string;
   hash: string;
};

type Intolerances = {
   user_id: number;
   intolerances: string;
};

//# creates a new user and stores in database;
export const create = async function (user: User) {
   let currentId = generator.generate({ length: 8, numbers: true });
   let createQuery = `INSERT INTO users (id, username, email,
      spoonacular_username, spoonacular_password, spoonacular_hash, hash)
      VALUES ('${currentId}', '${user.username}', '${user.email}',
       '${user.spoonacular_username}', '${user.spoonacular_password}', '${user.spoonacular_hash}',
        '${user.hash}') RETURNING id`;
   console.log(createQuery);
   let dbResponse = await db.query(createQuery);
   console.log('dbresponse in create user model', dbResponse);
   return dbResponse;
};

//same as creating user except id is already provided by google
export const createGoogleUser = async function (user: any) {
   let createQuery = `INSERT INTO users (id, username, email,
      spoonacular_username, spoonacular_password, spoonacular_hash, hash)
      VALUES ('${user.id}', '${user.username}', '${user.email}',
       '${user.spoonacular_username}', '${user.spoonacular_password}', '${user.spoonacular_hash}',
        '${user.hash}') `;
   console.log(createQuery);
   let dbResponse = await db.query(createQuery);
   console.log('dbresponse in create google user model', dbResponse);
   return dbResponse;
};

//# creates a new user and stores in database;
export const createUserIntolerances = function (intolerances: Intolerances) {
   let dbQuery = `UPDATE users SET intolerances = '{${intolerances.intolerances}}'
   `;
   console.log('dbQuery:', dbQuery);
   let result = db.query(dbQuery);

   return result;
};

//# check if user already exists by their email address
export const getByEmail = async function (email: string) {
   let getQuery = `SELECT * FROM users WHERE email='${email}'`;
   let user = await db.query(getQuery);
   return user;
};

export const getById = async function (id: string) {
   let getQuery = `SELECT * FROM users WHERE id='${id}'`;
   let user = await db.query(getQuery);
   return user;
};

//# retrieves user based on username
export const getByUsername = async function (username: string) {
   let getQuery = `SELECT * FROM users WHERE username='${username}'`;
   let user = await db.query(getQuery);
   return user;
};

//# retrieves spoonacular hash based on username
export const getHashByUsername = async (username: string) => {
   let getQuery = `SELECT spoonacular_hash FROM users WHERE users.spoonacular_username='${username}'`;
   console.log('getQuery:', getQuery);
   let hash = await db.query(getQuery);
   return hash;
};
