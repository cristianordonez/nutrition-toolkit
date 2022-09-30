import { Request, Response, Router } from 'express';
import {
   createGoals,
   getGoals,
   updateGoals,
} from '../controllers/goals.controller';
const router = Router();

router.get('/', (req: Request, res: Response) => {
   getGoals(req, res);
});

router.post('/', (req: Request, res: Response) => {
   createGoals(req, res);
});

router.put('/', (req: Request, res: Response) => {
   updateGoals(req, res);
});

export { router };
