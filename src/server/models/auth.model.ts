import { UserType } from '../../shared/types';
import { db } from '../database/db';

/**
 * Save user to db
 * @param user UserType instance containing user email password
 * @returns
 */
const createUser = (user: UserType) => {
   try {
      const createQuery = `WITH getId AS 
          (INSERT INTO users (email) 
          VALUES ($1) 
          RETURNING user_id)
          INSERT INTO user_hash (user_id, hash)
          VALUES ((SELECT user_id FROM getId), $2) RETURNING user_id`;
      const dbResponse = db.one(createQuery, [user.email, user.password]);
      return dbResponse;
   } catch (err) {
      console.log('err: ', err);
      return err;
   }
};

const createGoogleUser = async (user: { email: string }) => {
   try {
      const createGoogleUserQuery = `INSERT INTO users (email) 
          VALUES ($1) 
          RETURNING user_id`;
      const createGoogleUserResponse = db.one(createGoogleUserQuery, [
         user.email,
      ]);
      return createGoogleUserResponse;
   } catch (err) {
      console.log('err: ', err);
   }
};

const updatePassword = async (userId: number, password: string) => {
   try {
      const passwordQuery = `UPDATE user_hash SET hash=$1 WHERE user_id=$2`;
      const dbResponse = db.none(passwordQuery, [password, userId]);
      return dbResponse;
   } catch (err) {
      console.log('err: ', err);
      return err;
   }
};

const getGoogleUser = async (email: string) => {
   try {
      const getGoogleUserQuery = `SELECT email, user_id FROM users WHERE email=$1`;
      const user = db.oneOrNone(getGoogleUserQuery, email);
      return user;
   } catch (err) {
      console.error('err: ', err);
   }
};

const getHash = (email: string) => {
   const getHashQuery = `SELECT hash FROM user_hash
                         INNER JOIN users 
                         ON user_hash.user_id = users.user_id
                         WHERE email = $1`;
   const hash = db.oneOrNone(getHashQuery, email);
   return hash;
};

export { createUser, updatePassword, getHash, getGoogleUser, createGoogleUser };
