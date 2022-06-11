//#connects server to the models
import express from 'express';
import bcrypt from 'bcrypt';
import * as models from '../models/user.model';
import * as apiHelpers from '../API/api';
import { v4 as uuidv4 } from 'uuid';
const saltRounds = 10;

type Body = {
   username: string;
   firstName: string;
   lastName: string;
   email: string;
   password: string;
};

const create = async function (req: express.Request, res: express.Response) {
   // first check if user email or username already exists
   try {
      let checkForExistingEmail = await models.getByEmail(req.body.email);
      let checkForExistingUsername = await models.getByUsername(
         req.body.username
      );
      //if either email or username already exists in db, cancel the request
      if (
         checkForExistingEmail[0].length ||
         checkForExistingUsername[0].length
      ) {
         res.status(400).send(
            'An account with your email or username already exists.'
         );
      } else {
         let spoonacularAccount = await apiHelpers.connectUser(req.body);
         let hash: string = await bcrypt.hash(req.body.password, saltRounds);
         let user = req.body;
         //delete plain text password so that it is not stored in db
         delete user.password;
         user.spoonacular_username = spoonacularAccount.data.username;
         user.spoonacular_password =
            spoonacularAccount.data.spoonacularPassword;
         user.spoonacular_hash = spoonacularAccount.data.hash;
         user.hash = hash;
         user.id_user = uuidv4();
         //then, send data to model to store all info in db
         let dbResponse = await models.create(user);
         res.send('You have successfully created an account!');
      }
   } catch (err) {
      res.status(500).send('Unable to create an account.');
   }
};

export { create };
