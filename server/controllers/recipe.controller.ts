import { Request, Response } from 'express';
import * as apiHelpers from '../API/api';
import { Query } from './controllers.types';

export const getRecipes = async function (req: Request, res: Response) {
   const query = req.query as unknown as Query;
   console.log('query:', query);
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

type Params = {
   id: number;
}

export const getRecipeById = async function (req: Request, res: Response) {
   let params = req.params as unknown as Params;
   try {
      let recipeInfo = await apiHelpers.getSpoonacularRecipeById(params.id)
      
      res.status(200).send(recipeInfo);

   } catch(err) {
      console.log('err in get recipe by id', err)
      res.status(400).send('Could not get recipe information');
   }
}
