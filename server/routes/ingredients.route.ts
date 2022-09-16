import { Request, Response, Router } from 'express';
import { getIngredients } from '../controllers/ingredients.controller';

const router = Router();

router.get('/', (req: Request, res: Response) => {
   getIngredients(req, res);
});

export { router };
