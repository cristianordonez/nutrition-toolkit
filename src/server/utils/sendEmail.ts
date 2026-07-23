import nodemailer, { Transport, TransportOptions } from 'nodemailer';
import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;

/**
 * Function that automatically generates refresh tokens from google developer console
 * using access token and the google playground
 * @returns access token
 */
const createTransporter = async () => {
   const oauth2Client = new OAuth2(
      process.env.GMAIL_OAUTH_CLIENT_ID,
      process.env.GMAIL_OAUTH_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
   );
   oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
   });
   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         type: 'OAuth2',
         user: process.env.EMAIL_USERNAME,
         clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
         clientSecret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
         refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      },
   } as TransportOptions | Transport<unknown>);
   return transporter;
};

export const sendEmail = async (email: string, link: string) => {
   const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email, //receiving address
      subject: 'Account Recovery',
      text: `Hi, \n You requested to reset your password. \n Please click this link to reset your password: \n${link}`,
   };
   const emailTransporter = await createTransporter();
   const response = await emailTransporter.sendMail(mailOptions);
   return response;
};
