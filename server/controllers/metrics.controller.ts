import { Request, Response } from 'express';
import { createGoals, getGoals, updateGoals } from '../models/metrics.model';

//# gets metrics from user from database
const getMetrics = async (req: any, res: Response) => {
   try {
      let user_id = req.session.user_id;
      let userGoals: any = await getGoals(user_id);
      res.status(201).send(userGoals[0]);
   } catch (err) {
      console.log(err);
      res.status(500).send('Unable to retrieve daily goals.');
   }
};

//# handles initial setting of daily goals and intolerances
const createMetrics = async (req: Request, res: Response) => {
   try {
      let session: any = req.session;
      let user_id: number = session.user_id;
      let body = { ...req.body, user_id };
      let initialResponse = await createGoals(body);
      res.status(201).json(session.user_id);
   } catch (err) {
      console.log(err);
      res.status(400).send(err);
   }
};

const updateMetrics = async (req: Request, res: Response) => {
   try {
      let session: any = req.session;
      let user_id: number = session.user_id;
      let body = { ...req.body, user_id };
      let initialResponse = await updateGoals(body);
      res.status(201).send(initialResponse);
   } catch (err) {
      console.log(err);
      res.status(400).send('Unable to update daily goals.');
   }
};

export { getMetrics, createMetrics, updateMetrics };
