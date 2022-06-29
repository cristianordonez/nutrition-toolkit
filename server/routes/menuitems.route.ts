import { Request, Response, Router } from 'express';
import * as controller from '../controllers/menuitems.controller';
const router = Router();

//handles creating account
router.get('/', (req: Request, res: Response) => {
   controller.getMenuItems(req, res);
});

export { router };
