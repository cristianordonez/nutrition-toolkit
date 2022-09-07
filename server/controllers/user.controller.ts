import { Request, Response } from 'express';
import * as userModel from '../models/user.model';
import * as dailyGoalsModel from '../models/dailyGoals.model';
import * as tokensModel from '../models/tokens.model';
import { connectUser } from '../API/api';
import bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { sendEmail } from '../utils/sendEmail';
import format from 'date-fns/format';
const saltRounds = 10;

type Body = {
   username: string;
   email: string;
   password: string;
};

//# create initial account if not already exists
export const createAccount = async (req: Request, res: Response) => {
   try {
      let checkForExistingEmail: any = await userModel.getByEmail(
         req.body.email
      ); //  first check if user email or username already exists
      let checkForExistingUsername: any = await userModel.getByUsername(
         req.body.username
      );

      if (
         checkForExistingEmail.length || // if either email or username already exists in db, cancel the request
         checkForExistingUsername.length
      ) {
         res.status(500).send(
            'An account with your email or username already exists.'
         );
      } else {
         let spoonacularAccount = await connectUser(req.body); // delete plain text password so that it is not stored in db
         let hash: string = await bcrypt.hash(req.body.password, saltRounds);
         let user = req.body;
         delete user.password;
         user.spoonacular_username = spoonacularAccount.data.username;
         user.spoonacular_password =
            spoonacularAccount.data.spoonacularPassword;
         user.spoonacular_hash = spoonacularAccount.data.hash;
         user.hash = hash;
         let dbResponse = await userModel.create(user); // then, send data to model to store all info in db
         let session: any = req.session; // put user id into req.sessions
         session.user_id = dbResponse[0].id; //save user_id to session so that it can be retrieved with next request when getting metrics
         res.status(201).send('You have successfully created an account!');
      }
   } catch (err) {
      console.log(err);
      res.status(500).send('Unable to create an account.');
   }
};

//# handles initial setting of daily goals and intolerances
export const createMetrics = async (req: Request, res: Response) => {
   try {
      let session: any = req.session;
      let user_id: number = session.user_id;
      let body = { ...req.body, user_id };
      let initialResponse = await dailyGoalsModel.createGoals(body);
      res.status(201).json(session.user_id);
   } catch (err) {
      console.log(err);
      res.status(400).send(err);
   }
};

//# checks if user is logged in
export const checkAuthentication = async (req: Request, res: Response) => {
   let session: any = req.session;
   if (session.passport || session.username) {
      res.status(201).send(session.username);
   } else {
      res.status(403).send('User is not logged in.');
   }
};

//# gets metrics from user from database
export const getMetrics = async (req: any, res: Response) => {
   try {
      let user_id = req.session.user_id;
      let userGoals: any = await dailyGoalsModel.getGoals(user_id);
      res.json(userGoals[0]);
   } catch (err) {
      console.log(err);
      res.status(500).send('Unable to retrieve daily goals.');
   }
};

export const updateMetrics = async (req: Request, res: Response) => {
   try {
      let session: any = req.session;
      let user_id: number = session.user_id;
      let body = { ...req.body, user_id };
      let initialResponse = await dailyGoalsModel.updateGoals(body);
      res.status(201).send(initialResponse);
   } catch (err) {
      console.log(err);
      res.status(400).send('Unable to update daily goals.');
   }
};

//sends email to user to reset their email address
export const forgotPassword = async (req: Request, res: Response) => {
   //first check if user email exists
   try {
      let user = await userModel.getByEmail(req.body.email);
      //if email does not exist in db, then return error
      if (user.length === 0) {
         res.status(403).send(
            'No account registered to that email exists. Would you like to create an account instead?'
         );
      } else {
         //otherwise, check if token exists

         let currentToken = await tokensModel.findOne(user[0].id);
         //if token exists delete it first

         if (currentToken.length > 0) {
            await tokensModel.deleteOne(currentToken[0].token);
         }

         //add new token to database linked to current user
         let resetToken = crypto.randomBytes(32).toString('hex');
         const hash = await bcrypt.hash(resetToken, Number(saltRounds));
         await tokensModel.addToken({
            userId: user[0].id,
            token: hash,
            createdAt: format(new Date(Date.now()), 'MM/dd/yyyy'),
         });
         //send email to user using sendEmail file that uses token to verify user, and sends to user w
         const link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${user[0].id}`;
         let response = await sendEmail(user[0].email, link);
         res.status(200).send(
            'Your account recovery link has been sent to your email.'
         );
      }
   } catch (err) {
      res.status(400).send('Unable to send an email. Please try again later.');
   }
};

type ResetPasswordBody = {
   userId: string;
   token: string;
   password: string;
};

export const resetPassword = async (req: Request, res: Response) => {
   let body: ResetPasswordBody = req.body;
   try {
      //grab reset token from database
      let resetToken = await tokensModel.findOne(body.userId);

      if (!resetToken) {
         res.status(403).send('Invalid or expired password reset token');
      }
      //compare the token sent from client to token found in database
      const isValidToken = await bcrypt.compare(
         body.token,
         resetToken[0].token
      );
      //if the token provided from client is not the same as the one stored in db, return error
      if (!isValidToken) {
         res.status(403).send('Invalid or expired password reset token');
      } else {
         //otherwise, hash the new password and update in database
         const hash = await bcrypt.hash(body.password, Number(saltRounds));
         await userModel.updatePassword(body.userId, hash);
         res.status(200).send('Your password has been updated!');
      }
   } catch (err) {
      res.status(403).send('Unable to change password');
   }
};
