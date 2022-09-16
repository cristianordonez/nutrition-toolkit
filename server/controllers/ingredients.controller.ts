import { Request, Response } from 'express';
import { IngredientsQuery } from '../../types/types';
import { getSpoonacularIngredients } from '../API/ingredients.api';

const getIngredients = async function (req: Request, res: Response) {
   const query = req.query as unknown as IngredientsQuery;
   try {
      const returnedIngredients = await getSpoonacularIngredients(query);
      res.send(returnedIngredients);
   } catch (err) {
      console.log(err);
      res.status(400).send('Could not get ingredients products.');
   }
};

export { getIngredients };
