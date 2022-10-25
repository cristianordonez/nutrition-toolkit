import { Request, RequestHandler, Response, Router } from 'express';
import {
   createGoals,
   getGoals,
   updateGoals,
} from '../controllers/goals.controller';
const router = Router();

router.get('/', (req: Request, res: Response) => {
   getGoals(req, res) as unknown as RequestHandler;
});

router.post('/', (req: Request, res: Response) => {
   createGoals(req, res) as unknown as RequestHandler;
});

router.put('/', (req: Request, res: Response) => {
   updateGoals(req, res) as unknown as RequestHandler;
});

export { router };
