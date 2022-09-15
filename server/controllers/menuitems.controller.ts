//#connects server to the models
import { Request, Response } from 'express';
import { Query } from '../../types/types';
import * as apiHelpers from '../API/api';

export const getMenuItems = async function (req: Request, res: Response) {
   const query = req.query as unknown as Query;
   try {
      let menuItems = await apiHelpers.getSpoonacularMenuItems(query);
      res.send(menuItems);
   } catch (err) {
      console.log(err);
      res.status(400).send('Could not get menu items.');
   }
};

type Params = {
   id: number;
};

export const getMenuItemById = async function (req: Request, res: Response) {
   let params = req.params as unknown as Params;
   try {
      let menuItemInfo = await apiHelpers.getSpoonacularMenuItemById(params.id);
      res.status(200).send(menuItemInfo);
   } catch (err) {
      console.log(err);
      res.status(400).send('Could not get menu item information');
   }
};
