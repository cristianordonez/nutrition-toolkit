import { Request, Response } from 'express';
import { Query, RequestParams } from '../../types/types';
import {
   getSpoonacularGroceryProducts,
   getSpoonacularProductById,
} from '../API/api.groceryProducts';

const getGroceryProducts = async function (req: Request, res: Response) {
   const query = req.query as unknown as Query;
   try {
      let groceryProducts = await getSpoonacularGroceryProducts(query);
      res.send(groceryProducts);
   } catch (err) {
      console.log(err);
      res.status(400).send('Could not get grocery products.');
   }
};

const getProductById = async function (req: Request, res: Response) {
   let params = req.params as unknown as RequestParams;
   try {
      let productInfo = await getSpoonacularProductById(params.id);
      res.status(200).send(productInfo);
   } catch (err) {
      console.log(err);
      res.status(400).send('Could not get product information');
   }
};

export { getGroceryProducts, getProductById };
