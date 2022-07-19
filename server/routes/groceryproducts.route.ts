import { Request, Response, Router } from 'express';
import * as controller from '../controllers/groceryproducts.controller';
const router = Router();

router.get('/', (req: Request, res: Response) => {
   controller.getGroceryProducts(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
   controller.getProductById(req, res);
});

export { router };
