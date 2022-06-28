import * as express from 'express';
import * as controller from '../controllers/recipe.controller';
const router = express.Router();

//handles creating account
router.get('/', (req: any, res: any) => {
   controller.getRecipes(req, res);
});

export { router };
