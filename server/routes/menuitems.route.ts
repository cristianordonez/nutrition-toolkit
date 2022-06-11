import * as express from 'express';
import * as controller from '../controllers/menuitems.controller';
const router = express.Router();

//handles creating account
router.get('/', (req: any, res: any) => {
   controller.getMenuItems(req, res);
});

export default router;
