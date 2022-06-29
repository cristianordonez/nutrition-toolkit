import { Request, Response, Router } from 'express';
import * as controller from '../controllers/groceryproducts.controller';
const router = Router();

//handles creating account
router.get('/', (req: Request, res: Response) => {
   controller.getGroceryProducts(req, res);
});

export { router };
