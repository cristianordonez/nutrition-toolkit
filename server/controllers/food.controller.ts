import { Request, Response } from 'express';
import { Query } from '../../types/types';

const getFoodItems = async function (req: Request, res: Response) {
   const query = req.query as unknown as Query;
   console.log('query:', query);
   try {
   } catch (err) {
      console.log(err);
      res.status(400).send('Could not get food items.');
   }
};

export { getFoodItems };
