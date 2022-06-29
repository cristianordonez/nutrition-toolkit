import { Request, Response, Router } from 'express';
import * as controller from '../controllers/recipe.controller';
const router = Router();

//handles creating account
router.get('/', (req: Request, res: Response) => {
   controller.getRecipes(req, res);
});

export { router };
