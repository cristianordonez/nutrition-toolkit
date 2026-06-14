import { Request, RequestHandler, Response, Router } from 'express';
import {
   createMetrics,
   deleteUserMetrics,
   getMetrics,
   updateMetrics,
} from '../controllers/metrics.controller';
const router = Router();

router.get('/', (req: Request, res: Response) => {
   getMetrics(req, res) as unknown as RequestHandler;
});

router.post('/', (req: Request, res: Response) => {
   createMetrics(req, res) as unknown as RequestHandler;
});

router.put('/', (req: Request, res: Response) => {
   updateMetrics(req, res) as unknown as RequestHandler;
});

router.delete('/', (req: Request, res: Response) => {
   deleteUserMetrics(req, res) as unknown as RequestHandler;
});

export { router };
