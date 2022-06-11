import * as express from 'express';
import * as controller from '../controllers/user.controller';
const router = express.Router();

//handles creating account
router.post('/', (req: any, res: any) => {
   controller.create(req, res);
});

export default router;
