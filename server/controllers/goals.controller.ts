import { Request, Response } from 'express';
import { CalculateGoalsArgs, CurrentGoals, Session } from '../../types/types';
import { create, get, update } from '../models/goals.model';
import { calculate } from '../utils/calculateGoals';

const calculateGoals = async (req: Request, res: Response) => {
   try {
      const data = req.query as unknown as CalculateGoalsArgs;
      const goals = calculate(data);
      setTimeout(() => {
         res.status(201).send(goals);
      }, 1000);
   } catch (err) {
      console.log(err);
      res.status(500).send('Unable to calculate goals.');
   }
};

const getGoals = async (req: Request, res: Response) => {
   try {
      const session = req.session as unknown as Session;
      const user_id = session.user_id;
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
      const body = req.body as unknown as CurrentGoals;
      const user_id: number | string = session.user_id;
      const goals = { ...body, user_id };
      await create(goals);
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
      const body = req.body as unknown as CurrentGoals;
      const goals = { ...body, user_id };
      const updatedGoals = await update(goals);
      res.status(201).send(updatedGoals);
   } catch (err) {
      console.log(err);
      res.status(400).send('Unable to update daily goals.');
   }
};

export { calculateGoals, getGoals, createGoals, updateGoals };
