import * as express from 'express';
import * as controller from '../controllers/groceryproducts.controller';
const router = express.Router();

//handles creating account
router.get('/', (req: any, res: any) => {
   controller.getGroceryProducts(req, res);
});

export default router;
