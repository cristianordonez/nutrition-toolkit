import nodemailer from 'nodemailer';
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const { OAuth2Client } = require('google-auth-library');
import SMTPTransport from 'nodemailer';

//function that automatically generates refresh tokens from google developer console
// using access token and the google playground
const createTransporter = async () => {
   const oauth2Client = new OAuth2(
      process.env.OAUTH_CLIENT_ID,
      process.env.OAUTH_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
   );
   oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
   });
   const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err: any, token: any) => {
         if (err) {
            reject();
         }
         resolve(token);
      });
   });
   //set up nodemailer transport using OAuth2 to automatically send emails
   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         type: 'OAuth2',
         user: process.env.EMAIL_USERNAME,
         accessToken,
         // pass: process.env.EMAIL_PASSWORD,
         clientId: process.env.OAUTH_CLIENT_ID,
         clientSecret: process.env.OAUTH_CLIENT_SECRET,
         refreshToken: process.env.REFRESH_TOKEN,
      },
   } as any);
   return transporter;
};

export const sendEmail = async (email: string, link: string) => {
   let mailOptions = {
      from: process.env.EMAIL_USERNAME,
      ////to: email, //receiving address
      to: 'cristianordonezrd@gmail.com',
      subject: 'Account Recovery',
      text: `Hi, \n You requested to reset your password. \n Please click this link to reset your password: \n${link}`,
   };

   try {
      let emailTransporter = await createTransporter();
      let response = await emailTransporter.sendMail(mailOptions);
      return response;
      // res.status(201).send('Success');
   } catch (err) {
      return err;
   }
};
