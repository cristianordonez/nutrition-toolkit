import { Request, Response, Router } from 'express';
import * as menuItemController from '../controllers/menuitems.controller';
const router = Router();

//handles creating account
router.get('/', (req: Request, res: Response) => {
   menuItemController.getMenuItems(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
   menuItemController.getMenuItemById(req,res);
})


export { router };
