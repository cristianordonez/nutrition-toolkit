import axios from 'axios';
import { Request, Response } from 'express';
import { Query, IngredientType } from '../../types/types';
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

export { getIngredients };
