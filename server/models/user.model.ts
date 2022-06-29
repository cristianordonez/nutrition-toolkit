import { pool } from '../database/db';

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
   const createQuery = `INSERT INTO users (username, email,
      spoonacular_username, spoonacular_password, spoonacular_hash, hash)
      VALUES ('${user.username}', '${user.email}',
       '${user.spoonacular_username}', '${user.spoonacular_password}', '${user.spoonacular_hash}',
        '${user.hash}') RETURNING id`;
   let dbResponse = await pool.query(createQuery);
   return dbResponse;
};

//# creates a new user and stores in database;
export const createUserIntolerances = function (intolerances: Intolerances) {
   let dbQuery = `UPDATE users SET intolerances = '{${intolerances.intolerances}}'
   `;
   console.log('dbQuery:', dbQuery);
   let result = pool.query(dbQuery);

   return result;
};

//# check if user already exists by their email address
export const getByEmail = async function (email: string) {
   const getQuery = `SELECT * FROM users WHERE email='${email}'`;
   let user = await pool.query(getQuery);
   return user;
};

//# retrieves user based on username
export const getByUsername = async function (username: string) {
   const getQuery = `SELECT * FROM users WHERE username='${username}'`;
   let user = await pool.query(getQuery);
   return user;
};
