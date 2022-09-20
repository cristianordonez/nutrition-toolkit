import axios from 'axios';
import { Request, Response } from 'express';
import { Query } from '../../types/types';
import {
   getSpoonacularIngredientById,
   getSpoonacularIngredients,
} from '../API/ingredients.api';

type IngredientResponse = {
   id: number;
   name: string;
   image: string;
   children: [];
};

const getIngredients = async function (req: Request, res: Response) {
   const query = req.query as unknown as Query;
   try {
      const returnedIngredients = await getSpoonacularIngredients(query);

      let url = 'https://spoonacular.com/cdn/ingredients_';

      const updatedIngredients = await Promise.all(
         returnedIngredients.map(async (ingredient: IngredientResponse) => {
            let imageUrl = `${url}250x250/${ingredient.image}`;
            ingredient.image = imageUrl;
            return ingredient;
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
