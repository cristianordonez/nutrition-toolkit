import { Request, Response, Router } from 'express';
import {
   getGroceryProducts,
   getProductById,
} from '../controllers/groceryproducts.controller';
const router = Router();

router.get('/', (req: Request, res: Response) => {
   getGroceryProducts(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
   getProductById(req, res);
});

export { router };
