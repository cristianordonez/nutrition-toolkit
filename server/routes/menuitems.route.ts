import { Request, Response, Router } from 'express';
import {
   getMenuItemById,
   getMenuItems,
} from '../controllers/menuitems.controller';
const router = Router();

//handles creating account
router.get('/', (req: Request, res: Response) => {
   getMenuItems(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
   getMenuItemById(req, res);
});

export { router };
