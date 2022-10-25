import nodemailer, { Transport, TransportOptions } from 'nodemailer';
// const { google } = require('googleapis');
import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;
// const { OAuth2Client } = require('google-auth-library');

//function that automatically generates refresh tokens from google developer console
// using access token and the google playground
const createTransporter = async () => {
   const oauth2Client = new OAuth2(
      process.env.GMAIL_OAUTH_CLIENT_ID,
      process.env.GMAIL_OAUTH_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
   );
   oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
   });
   const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken(
         (err: unknown, token: string | null | undefined) => {
            if (err) {
               reject();
            }
            resolve(token);
         }
      );
   });
   //set up nodemailer transport using OAuth2 to automatically send emails
   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         type: 'OAuth2',
         user: process.env.EMAIL_USERNAME,
         accessToken,
         clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
         clientSecret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
         refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      },
   } as TransportOptions | Transport<unknown>);
   return transporter;
};

export const sendEmail = async (email: string, link: string) => {
   try {
      const mailOptions = {
         from: process.env.EMAIL_USERNAME,
         to: email, //receiving address
         subject: 'Account Recovery',
         text: `Hi, \n You requested to reset your password. \n Please click this link to reset your password: \n${link}`,
      };
      const emailTransporter = await createTransporter();
      const response = await emailTransporter.sendMail(mailOptions);
      return response;
   } catch (err) {
      return err;
   }
};
