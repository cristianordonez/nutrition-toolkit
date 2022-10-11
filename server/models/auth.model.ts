import { UserType } from '../../types/types';
import { db } from '../database/db';

const createUser = (user: UserType) => {
   const createQuery = `WITH getId AS 
      (INSERT INTO users (username, email) 
      VALUES ($1, $2) 
      RETURNING user_id)
      INSERT INTO user_hash (user_id, hash)
      VALUES ((SELECT user_id FROM getId), $3) RETURNING user_id`;
   let dbResponse = db.one(createQuery, [
      user.username,
      user.email,
      user.password,
   ]);
   return dbResponse;
};

type GoogleUser = {
   username: string;
   email: string;
};

const createGoogleUser = (user: GoogleUser) => {
   const createGoogleUserQuery = `INSERT INTO users (username, email) 
       VALUES ($1, $2) 
       RETURNING user_id`;
   const createGoogleUserResponse = db.one(createGoogleUserQuery, [
      user.username,
      user.email,
   ]);
   return createGoogleUserResponse;
};

const updatePassword = (userId: string, password: string) => {
   const passwordQuery = `UPDATE user_hash SET hash=$1 WHERE user_id=$2`;
   let dbResponse = db.none(passwordQuery, [password, userId]);
   return dbResponse;
};

const getGoogleUser = (email: string) => {
   const getGoogleUserQuery = `SELECT username, email, user_id FROM users WHERE email=$1`;
   const user = db.oneOrNone(getGoogleUserQuery, email);
   return user;
};

const getHash = (usernameOrEmail: string) => {
   const getHashQuery = `SELECT hash FROM user_hash
                         INNER JOIN users 
                         ON user_hash.user_id = users.user_id
                         WHERE username = $1 
                         OR email = $1`;
   const hash = db.oneOrNone(getHashQuery, usernameOrEmail);
   return hash;
};

export { createUser, updatePassword, getHash, getGoogleUser, createGoogleUser };
