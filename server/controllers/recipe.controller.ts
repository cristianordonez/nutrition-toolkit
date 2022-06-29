//#connects server to the models
import { Request, Response } from 'express';
import { Query } from '../../types/QueryType';
import * as apiHelpers from '../API/api';

export const getRecipes = async function (req: Request, res: Response) {
   const query = req.query as unknown as Query;
   try {
      if (req.query) {
         let recipes = await apiHelpers.getSpoonacularRecipes(query);
         res.send(recipes);
      }
   } catch (err) {
      console.log('err:', err);
      res.status(400).send('Could not get recipes.');
   }
};
