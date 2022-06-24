//#connects server to the models
import { Request, Response } from 'express';
import * as apiHelpers from '../API/api';
import { Query } from '../../types/QueryType';

const getMenuItems = async function (req: Request, res: Response) {
   const query = req.query as unknown as Query;

   try {
      let menuItems = await apiHelpers.getSpoonacularMenuItems(query);
      res.send(menuItems);
   } catch (err) {
      console.log('err:', err);
      res.status(400).send('Could not get menu items.');
   }
};

export { getMenuItems };
