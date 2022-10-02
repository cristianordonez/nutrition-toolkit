import { Intolerances, UserType } from '../../types/types';
import { db } from '../database/db';

const createUser = (user: UserType) => {
   const createQuery = `WITH getId AS 
                        (INSERT INTO users (username, email) 
                        VALUES ('${user.username}', '${user.email}') 
                        RETURNING id)
                        INSERT into user_hash (user_id, hash)
                        VALUES ((SELECT id from getId), '${user.password}') RETURNING id`;
   let dbResponse = db.query(createQuery);
   return dbResponse;
};

type GoogleUser = {
   username: string;
   email: string;
};

const createGoogleUser = (user: GoogleUser) => {
   const createGoogleUserQuery = `INSERT INTO users (username, email) 
                        VALUES ('${user.username}', '${user.email}') 
                        RETURNING id`;
   const createGoogleUserResponse = db.query(createGoogleUserQuery);
   return createGoogleUserResponse;
};

const updatePassword = (userId: string, password: string) => {
   const passwordQuery = `UPDATE user_hash SET hash='${password}' WHERE id='${userId}'`;
   let dbResponse = db.query(passwordQuery);
   return dbResponse;
};

const createUserIntolerances = function (intolerances: Intolerances) {
   let dbQuery = `UPDATE users SET intolerances = '{${intolerances.intolerances}}'
   `;
   let result = db.query(dbQuery);
   return result;
};

const getGoogleUser = (email: string) => {
   const getGoogleUserQuery = `SELECT username, email, id FROM users WHERE email='${email}'`;
   const user = db.query(getGoogleUserQuery);
   return user;
};

const getHash = (usernameOrEmail: string) => {
   const getHashQuery = `SELECT hash FROM user_hash
                         INNER JOIN users 
                         ON user_hash.user_id = users.id
                         WHERE username = '${usernameOrEmail}' 
                         OR email = '${usernameOrEmail}' `;
   const hash = db.query(getHashQuery);
   return hash;
};

export {
   createUser,
   updatePassword,
   createUserIntolerances,
   getHash,
   getGoogleUser,
   createGoogleUser,
};
