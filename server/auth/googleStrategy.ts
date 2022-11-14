import GoogleStrategy from 'passport-google-oidc';
import { PassportGoogleUser } from '../../types/types';
import { createGoogleUser, getGoogleUser } from '../models/auth.model';

export const customGoogleStrategy = new GoogleStrategy(
   {
      clientID: process.env['GOOGLE_SIGNIN_CLIENT_ID'],
      clientSecret: process.env['GOOGLE_SIGNIN_CLIENT_SECRET'],
      callbackURL: '/api/oauth2/redirect/google',
      scope: ['profile', 'email'], //the data we are asking for from google
   },
   (
      issuer: string,
      profile: { displayName: string; emails: [{ value: string }] },
      done: (err?: string | null, user?: Express.User, info?: unknown) => void
   ) => {
      getGoogleUser(profile.emails[0].value)
         .then((response: PassportGoogleUser | null) => {
            //if user exists, redirect
            if (response !== null && response.user_id) {
               done(null, response.user_id);
            } else {
               const user = {} as PassportGoogleUser;
               user.username = profile.displayName;
               user.email = profile.emails[0].value;
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
