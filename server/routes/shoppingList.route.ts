import { Request, Response, Router } from 'express';
import { generateShoppingList } from '../controllers/shoppingList.controller';

const router = Router();

router.post('/generate', (req: Request, res: Response) => {
   generateShoppingList(req, res);
});

export { router };
