import axios from 'axios';
import { Request, Response } from 'express';
import { Query, IngredientType, RequestParams } from '../../types/types';
import {
   getSpoonacularIngredientById,
   getSpoonacularIngredients,
} from '../API/ingredients.api';

const getIngredients = async function (req: Request, res: Response) {
   const query = req.query as unknown as Query;
   try {
      const returnedIngredients = await getSpoonacularIngredients(query);
      const updatedIngredients = await Promise.all(
         returnedIngredients.map(async (ingredient: IngredientType) => {
            let imageUrl = `https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`;
            const response = await getSpoonacularIngredientById(
               ingredient.id,
               1,
               ingredient.possibleUnits[ingredient.possibleUnits.length - 1]
            );
            response.image = imageUrl;
            return response;
         })
      );
      console.log('updatedIngredient:', updatedIngredients);
      res.send(updatedIngredients);
   } catch (err) {
      console.log(err);
      res.status(400).send('Could not get ingredients products.');
   }
};

const getIngredientById = async function (req: Request, res: Response) {
   let params = req.params as unknown as RequestParams;
   const query = req.query as unknown as any;

   console.log('params:', params);
   console.log('query:', query);
   try {
      let ingredientInfo = await getSpoonacularIngredientById(
         params.id,
         query.amount,
         query.unit
      );
      res.status(200).send(ingredientInfo);
   } catch (err) {
      // console.log(err);
      res.status(400).send('Could not get product information');
   }
};

export { getIngredients, getIngredientById };
