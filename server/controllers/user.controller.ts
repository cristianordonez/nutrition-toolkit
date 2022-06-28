import { Request, Response } from 'express';
import {
   create,
   getByEmail,
   getByUsername,
   createUserIntolerances,
} from '../models/user.model';
import { createGoals } from '../models/dailyGoals.model';
import { connectUser } from '../API/api';
import bcrypt from 'bcrypt';

const saltRounds = 10;

type Body = {
   username: string;
   email: string;
   password: string;
};

//create initial account if not already exists
const createAccount = async (req: Request, res: Response) => {
   ////  first check if user email or username already exists
   try {
      let checkForExistingEmail: any = await getByEmail(req.body.email);
      let checkForExistingUsername: any = await getByUsername(
         req.body.username
      );
      //// if either email or username already exists in db, cancel the request
      if (
         checkForExistingEmail.rows.length ||
         checkForExistingUsername.rows.length
      ) {
         res.status(500).send(
            'An account with your email or username already exists.'
         );
      } else {
         let spoonacularAccount = await connectUser(req.body);
         let hash: string = await bcrypt.hash(req.body.password, saltRounds);
         let user = req.body;
         //// delete plain text password so that it is not stored in db
         delete user.password;
         user.spoonacular_username = spoonacularAccount.data.username;
         user.spoonacular_password =
            spoonacularAccount.data.spoonacularPassword;
         user.spoonacular_hash = spoonacularAccount.data.hash;
         user.hash = hash;
         //// then, send data to model to store all info in db
         let dbResponse = await create(user);
         //todo put user id in response
         // req.session.user_id = dbResponse.id
         res.send('You have successfully created an account!');
      }
   } catch (err) {
      console.log('err:', err);
      res.status(500).send('Unable to create an account.');
   }
};

//handles initial setting of intolerances and goals
const createMetrics = async (req: Request, res: Response) => {
   console.log('req.session:', req.session);
   console.log('req.user:', req.user);
   try {
      //todo replace this with user id from session object
      // let user_id: string = req.session.id;
      let user_id: number = 1;
      let body = { ...req.body, user_id };
      let finalResponse = await createUserIntolerances(body);
      let initialResponse = await createGoals(body);
      console.log('finalResponse:', finalResponse);
      console.log('initialResponse:', initialResponse);
   } catch (err) {
      console.log('err:', err);
   }
};

export { createAccount, createMetrics };
