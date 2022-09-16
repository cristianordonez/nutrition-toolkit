import { Request, Response } from 'express';
import { Query, RecipeQuery, RequestParams } from '../../types/types';
import {
   getSpoonacularRandomRecipes,
   getSpoonacularRecipeById,
   getSpoonacularRecipes,
   getSpoonacularRecipesByQuery,
} from '../API/recipes.api';

const getRecipes = async (req: Request, res: Response) => {
   const query = req.query as unknown as Query;
   try {
      if (req.query) {
         let recipes = await getSpoonacularRecipes(query);
         res.send(recipes);
      }
   } catch (err) {
      console.log(err);
      res.status(400).send('Could not get recipes.');
   }
};

const getRecipeById = async (req: Request, res: Response) => {
   const params = req.params as unknown as RequestParams;
   try {
      let recipeInfo = await getSpoonacularRecipeById(params.id);
      res.status(200).send(recipeInfo);
   } catch (err) {
      console.log(err);
      res.status(400).send('Could not get recipe information');
   }
};

const getRecipesByQuery = async (req: Request, res: Response) => {
   const query = req.query as unknown as RecipeQuery;
   try {
      let recipes = await getSpoonacularRecipesByQuery(query);
      res.status(200).send(recipes);
   } catch (err) {
      console.log('err: ', err);
      res.status(400).send('Unable to find recipes.');
   }
};

const getRandomRecipes = async (req: Request, res: Response) => {
   try {
      let popularRecipes = await getSpoonacularRandomRecipes();
      res.status(200).send(popularRecipes);
   } catch (err) {
      console.log('err: ', err);
      res.status(400).send('Unable to retrieve recipes.');
   }
};

export { getRecipes, getRecipeById, getRecipesByQuery, getRandomRecipes };
