import { Request, Response } from 'express';
import * as apiHelpers from '../API/api';
import { Query } from '../../types/types';

export const getGroceryProducts = async function (req: Request, res: Response) {
   const query = req.query as unknown as Query;
   try {
      let groceryProducts = await apiHelpers.getSpoonacularGroceryProducts(
         query
      );
      res.send(groceryProducts);
   } catch (err) {
      console.log(err);
      res.status(400).send('Could not get grocery products.');
   }
};

type Params = {
   id: number;
};

export const getProductById = async function (req: Request, res: Response) {
   let params = req.params as unknown as Params;
   try {
      let productInfo = await apiHelpers.getSpoonacularProductById(params.id);
      res.status(200).send(productInfo);
   } catch (err) {
      console.log(err);
      res.status(400).send('Could not get product information');
   }
};
