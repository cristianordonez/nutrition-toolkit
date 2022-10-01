import { Request, Response } from 'express';
import { Query } from '../../types/types';
import { getAdvanced, getByCategory } from '../models/food.model';

const getFoodItems = async function (req: Request, res: Response) {
   try {
      // option1 : could be 'all' category with an allergy
      // option2: could be 'all' category with no allergy

      // option3: could be another category with allergy
      // option4: could be another category with no allergy
      const query = req.query as unknown as Query;
      console.log('query:', query);

      const foodItems =
         query.category === 'all'
            ? await getAdvanced(query)
            : await getByCategory(query);
      console.log('foodItems:', foodItems);
      res.status(200).send(foodItems);
   } catch (err) {
      console.log(err);
      res.status(400).send('Could not get food items.');
   }
};

export { getFoodItems };
