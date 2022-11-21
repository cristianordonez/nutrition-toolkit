import { Request, Response } from 'express';
import { CalculateGoalsArgs, Session } from '../../types/types';
import { create, deleteMetrics, get, update } from '../models/metrics.model';

const getMetrics = async (req: Request, res: Response) => {
   try {
      const session = req.session as unknown as Session;
      const user_id = session.user_id;
      const userMetrics: CalculateGoalsArgs = await get(user_id);
      res.status(201).send(userMetrics);
   } catch (err) {
      console.error(err);
      res.status(500).send('Unable to find user metrics.');
   }
};

const createMetrics = async (req: Request, res: Response) => {
   try {
      const session = req.session as unknown as Session;
      const user_id = session.user_id;
      const data = req.body as unknown as CalculateGoalsArgs;
      const height =
         data.heightMetric === 'cm'
            ? Number(data.height) / 2.54
            : Number(data.height);
      const weight =
         data.weightMetric === 'kg'
            ? Number(data.weight) * 2.2
            : Number(data.weight);
      data.height = height;
      data.weight = weight;
      console.log('data in createmetrics controller: ', data);
      await create(data, user_id);
      res.status(201).send('Successfully saved user metrics.');
   } catch (err) {
      console.error(err);
      res.status(400).send('Unable to save metrics.');
   }
};

const updateMetrics = async (req: Request, res: Response) => {
   try {
      const data = req.query as unknown as CalculateGoalsArgs;
      const height =
         data.heightMetric === 'cm'
            ? Number(data.height) / 2.54
            : Number(data.height);
      const weight =
         data.weightMetric === 'kg'
            ? Number(data.weight) * 2.2
            : Number(data.weight);
      data.height = height;
      data.weight = weight;
      const session = req.session as unknown as Session;
      const user_id = session.user_id;
      await update(data, user_id);
      res.status(201).send('Metrics have been updated.');
   } catch (err) {
      console.error('err: ', err);
      res.status(400).send('Metrics could not be updated.');
   }
};

const deleteUserMetrics = async (req: Request, res: Response) => {
   try {
      const session = req.session as unknown as Session;
      const user_id = session.user_id;
      await deleteMetrics(user_id);
      res.status(201).send('Metrics have been deleted.');
   } catch (err) {
      console.error('err: ', err);
      res.status(400).send('Metrics could not be deleted.');
   }
};

export { getMetrics, createMetrics, updateMetrics, deleteUserMetrics };
