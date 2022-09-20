import { Request, Response, Router } from 'express';
import {
   getIngredients,
   getIngredientById,
} from '../controllers/ingredients.controller';

const router = Router();

router.get('/', (req: Request, res: Response) => {
   getIngredients(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
   getIngredientById(req, res);
});

export { router };
