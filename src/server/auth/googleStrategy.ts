import GoogleStrategy from 'passport-google-oidc';
import { PassportGoogleUser } from '../../shared/types';
import { createGoogleUser, getGoogleUser } from '../models/auth.model';

const clientID = process.env['GOOGLE_SIGNIN_CLIENT_ID'] || '';
const clientSecret = process.env['GOOGLE_SIGNIN_CLIENT_SECRET'] || '';

/**
 * Enable google login using passport.js
 */
export const customGoogleStrategy = new GoogleStrategy(
   {
      clientID,
      clientSecret,
      callbackURL: '/api/oauth2/redirect/google',
      scope: ['profile', 'email'], //the data we are asking for from google
   },
   (
      issuer: string,
      profile: {
         id: string;
         displayName: string;
         name?:
            | {
                 familyName?: string | undefined;
                 givenName?: string | undefined;
              }
            | undefined;
         emails?: { value: string; type?: string | undefined }[] | undefined;
      },
      done: (err?: Error | null, user?: Express.User, info?: unknown) => void
   ) => {
      console.log('profile: ', profile);
      if (!profile.emails) {
         throw new Error('Email is not provided.');
      }
      const email = profile.emails[0].value;
      console.log('email: ', email);
      getGoogleUser(email)
         .then((response: PassportGoogleUser | null) => {
            //if user exists, redirect
            if (response !== null && response.user_id) {
               done(null, response.user_id);
            } else {
               const user = {} as PassportGoogleUser;
               user.email = email;
               createGoogleUser(user)
                  .then((userId: number) => {
                     user.user_id = userId;
                     done(null, user.user_id);
                  })
                  .catch((err) => {
                     done(err);
                  });
            }
         })
         .catch((err) => {
            done(err);
         });
   }
);
