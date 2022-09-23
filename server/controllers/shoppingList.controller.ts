import { Request, Response } from 'express';
import { generateSpoonacularShoppingList } from '../API/shoppingList.api';
import { ShoppingListBody, Session } from '../../types/types';
import { getByUsername } from '../models/auth.model';

const generateShoppingList = async (req: Request, res: Response) => {
   let body = req.body as unknown as ShoppingListBody;
   let session = req.session as unknown as Session;
   console.log('req.session:', req.session);
   console.log('body:', body);
   let username = session.username;
   let userData = await getByUsername(username);
   console.log('hash:', userData);
   try {
      const shoppingList = await generateSpoonacularShoppingList(
         userData[0].spoonacular_username,
         userData[0].spoonacular_hash,
         body.currentDay
      );
      console.log('shoppingLIst:', shoppingList);
   } catch (err) {
      console.log('err:', err);
   }
};

export { generateShoppingList };
