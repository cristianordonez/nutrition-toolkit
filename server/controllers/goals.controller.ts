import { Request, Response } from 'express';
import { CurrentGoals, Session } from '../../types/types';
import { create, get, update } from '../models/goals.model';

const getGoals = async (req: any, res: Response) => {
   try {
      const user_id = req.session.user_id;
      console.log('req.session: ', req.session);
      console.log('req.user: ', req.user);
      const userGoals: CurrentGoals[] = await get(user_id);
      res.status(201).send(userGoals);
   } catch (err) {
      console.log(err);
      res.status(500).send('Unable to retrieve daily goals.');
   }
};

const createGoals = async (req: Request, res: Response) => {
   try {
      const session = req.session as unknown as Session;
      const user_id: number | string = session.user_id;
      const body = { ...req.body, user_id };
      await create(body);
      res.status(201).json(session.user_id);
   } catch (err) {
      console.log(err);
      res.status(400).send(err);
   }
};

const updateGoals = async (req: Request, res: Response) => {
   try {
      const session = req.session as unknown as Session;
      const user_id: number | string = session.user_id;
      const body = { ...req.body, user_id };
      const updatedGoals = await update(body);
      res.status(201).send(updatedGoals);
   } catch (err) {
      console.log(err);
      res.status(400).send('Unable to update daily goals.');
   }
};

export { getGoals, createGoals, updateGoals };
