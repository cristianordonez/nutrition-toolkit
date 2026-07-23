import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { db } from '../database/db';

type HashResponse = {
   hash: string;
   user_id: string;
};

export const customLocalStrategy = new LocalStrategy(
   (username, password, cb) => {
      //expects key in body called username, but will check email instead for authentication
      db.query(
         `SELECT hash, users.user_id FROM user_hash 
         INNER JOIN users
         ON user_hash.user_id=users.user_id
         WHERE email = $1`,
         username
      )
         .then(function (result: HashResponse[]) {
            if (result.length) {
               const first = result[0];
               bcrypt.compare(password, first.hash, function (err, res) {
                  if (res) {
                     //saves second value to req.user, which I use to save to req.session so that it aligns with Google signin
                     cb(null, first.user_id);
                  } else {
                     cb(null, false, { message: 'Incorrect password' });
                  }
               });
            } else {
               cb(null, false, {
                  message: 'No account with that email exists',
               });
            }
         })
         .catch(function (err: unknown) {
            console.log(err);
            return cb(err);
         });
   }
);
