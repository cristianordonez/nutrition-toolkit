import bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import format from 'date-fns/format';
import { Request, Response } from 'express';
import { UserType } from '../../types/types';
import * as userModel from '../models/auth.model';
import * as tokensModel from '../models/tokens.model';
import { sendEmail } from '../utils/sendEmail';
const saltRounds = 10;

const createAccount = async (req: Request, res: Response) => {
   try {
      let checkForExistingAccount: any = await userModel.getHash(
         req.body.email
      );
      if (
         checkForExistingAccount.length // if either email or username already exists in db, cancel the request
      ) {
         res.status(500).send(
            'An account with your email or username already exists.'
         );
      } else {
         let user = req.body as UserType;
         const hash: string = await bcrypt.hash(user.password, saltRounds);
         user.password = hash;
         const dbResponse = await userModel.createUser(user);
         const session: any = req.session;
         session.user_id = dbResponse[0].id; //save user_id to session so that it can be retrieved with next request when getting metrics
         res.status(201).send('You have successfully created an account!');
      }
   } catch (err) {
      console.log('error creating an account:', err);
      res.status(500).send('Unable to create an account.');
   }
};

const checkAuthentication = async (req: Request, res: Response) => {
   let session: any = req.session;
   if (session.passport || session.username) {
      res.status(201).send(session.username);
   } else {
      res.status(403).send('User is not logged in.');
   }
};

const forgotPassword = async (req: Request, res: Response) => {
   try {
      let user = await userModel.getHash(req.body.email);
      if (user.length === 0) {
         res.status(403).send(
            'No account registered to that email exists. Would you like to create an account instead?'
         );
      } else {
         let currentToken = await tokensModel.findOne(user[0].id);
         if (currentToken.length > 0) {
            await tokensModel.deleteOne(currentToken[0].token);
         }
         let resetToken = crypto.randomBytes(32).toString('hex');
         const hash = await bcrypt.hash(resetToken, Number(saltRounds));
         await tokensModel.addToken({
            userId: user[0].id,
            token: hash,
            createdAt: format(new Date(Date.now()), 'MM/dd/yyyy'),
         });
         //send email to user using sendEmail file that uses token to verify user, and sends to user w
         const link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${user[0].id}`;
         await sendEmail(user[0].email, link);
         res.status(200).send(
            'Your account recovery link has been sent to your email.'
         );
      }
   } catch (err) {
      console.log('err:', err);
      res.status(400).send('Unable to send an email. Please try again later.');
   }
};

type ResetPasswordBody = {
   userId: string;
   token: string;
   password: string;
};

const resetPassword = async (req: Request, res: Response) => {
   let body: ResetPasswordBody = req.body;
   try {
      let resetToken = await tokensModel.findOne(body.userId);
      if (!resetToken) {
         res.status(403).send('Invalid or expired password reset token');
      }
      const isValidToken = await bcrypt.compare(
         body.token,
         resetToken[0].token
      );
      if (!isValidToken) {
         res.status(403).send('Invalid or expired password reset token');
      } else {
         const hash = await bcrypt.hash(body.password, Number(saltRounds));
         await userModel.updatePassword(body.userId, hash);
         res.status(200).send('Your password has been updated!');
      }
   } catch (err) {
      res.status(403).send('Unable to change password');
   }
};

export { createAccount, checkAuthentication, forgotPassword, resetPassword };
