import { Request, Response, Router } from 'express';
import { getGroceryProducts } from '../controllers/groceryproducts.controller';
const router = Router();

//handles creating account
router.get('/', (req: Request, res: Response) => {
   getGroceryProducts(req, res);
});

export { router };
