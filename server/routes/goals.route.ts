import { Request, RequestHandler, Response, Router } from 'express';
import {
   calculateGoals,
   createGoals,
   getGoals,
   updateGoals,
} from '../controllers/goals.controller';
const router = Router();

router.get('/calculate', (req: Request, res: Response) => {
   calculateGoals(req, res) as unknown as RequestHandler;
});

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
