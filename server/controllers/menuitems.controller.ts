//#connects server to the models
import { Request, Response } from 'express';
import { Query, RequestParams } from '../../types/types';
import {
   getSpoonacularMenuItemById,
   getSpoonacularMenuItems,
} from '../API/menuItems.api';

const getMenuItems = async function (req: Request, res: Response) {
   const query = req.query as unknown as Query;
   try {
      let menuItems = await getSpoonacularMenuItems(query);
      res.send(menuItems);
   } catch (err) {
      console.log(err);
      res.status(400).send('Could not get menu items.');
   }
};

const getMenuItemById = async function (req: Request, res: Response) {
   let params = req.params as unknown as RequestParams;
   try {
      let menuItemInfo = await getSpoonacularMenuItemById(params.id);
      res.status(200).send(menuItemInfo);
   } catch (err) {
      console.log(err);
      res.status(400).send('Could not get menu item information');
   }
};

export { getMenuItems, getMenuItemById };
