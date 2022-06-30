import { Request, Response } from 'express';
import * as userModel from '../models/user.model';
import * as dailyGoalsModel from '../models/dailyGoals.model';
import { connectUser } from '../API/api';
import bcrypt from 'bcrypt';

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
         checkForExistingEmail.rows.length || // if either email or username already exists in db, cancel the request
         checkForExistingUsername.rows.length
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
         // let req.session = req.session as any;
         session.user_id = dbResponse.rows[0].id;
         console.log('req.session:', req.session);
         res.status(201).send('You have successfully created an account!');
      }
   } catch (err) {
      console.log('err:', err);
      res.status(500).send('Unable to create an account.');
   }
};

//# handles initial setting of daily goals and intolerances
export const createMetrics = async (req: Request, res: Response) => {
   console.log('req.session in create metrics controller:', req.session);

   try {
      let session: any = req.session;
      let user_id: number = session.user_id;
      let body = { ...req.body, user_id };
      //// let finalResponse = await createUserIntolerances(body);
      let initialResponse = await dailyGoalsModel.createGoals(body);
      res.status(201).json(session.user_id);
   } catch (err) {
      console.log('err:', err);
      res.status(400).send(err);
   }
};

//# checks if user is logged in
export const checkAuthentication = async (req: any, res: Response) => {
   let session: any = req.session;
   console.log('session:', session);
   if (session.passport) {
      res.status(201).send('User is logged in.');
   } else {
      res.status(500).send('User is not logged in. ');
   }
};

//# gets metrics from user from database
export const getMetrics = async (req: any, res: Response) => {
   try {
      let user_id = req.session.passport.user;
      let userGoals: any = await dailyGoalsModel.getGoals(user_id);

      res.json(userGoals.rows[0]);
   } catch (err) {
      console.log('err:', err);
      res.status(500).send('Unable to retrieve daily goals.');
   }
};
