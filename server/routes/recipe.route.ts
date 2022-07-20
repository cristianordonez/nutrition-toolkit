import { Request, Response, Router } from 'express';
import * as recipeController from '../controllers/recipe.controller';
const router = Router();

//handles creating account
router.get('/', (req: Request, res: Response) => {
   recipeController.getRecipes(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
   recipeController.getRecipeById(req, res);
});

export { router };
