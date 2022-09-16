import { Request, Response, Router } from 'express';
import {
   createMetrics,
   getMetrics,
   updateMetrics,
} from '../controllers/metrics.controller';
const router = Router();

//# handles updating the users metrics at signup
router.post('/', (req: Request, res: Response) => {
   createMetrics(req, res);
});

router.get('/', (req: Request, res: Response) => {
   getMetrics(req, res);
});

router.put('/', (req: Request, res: Response) => {
   updateMetrics(req, res);
});

export { router };
