import { CalculateGoalsArgs } from '../../types/types';
import { db } from '../database/db';

const get = (user_id: string | number) => {
   const dbQuery = `SELECT user_id, height, weight, age, gender, goal_name AS goal, activity_level,
    FROM user_metrics WHERE user_id = $1`;
   const getResponse = db.oneOrNone(dbQuery, user_id);
   return getResponse;
};

const create = (metrics: CalculateGoalsArgs, user_id: string | number) => {
   const dbQuery = `
   INSERT INTO user_metrics (height, weight, age, gender, activity_level, goal_name, user_id)
   VALUES ($<metrics.height>, 
      $<metrics.weight>,
      $<metrics.age>, 
      $<metrics.gender>,
      $<metrics.activityLevel>,
      $<metrics.goal>,
      $/user_id/)
   ON CONFLICT (user_id) 
   DO UPDATE SET
   height = $<metrics.height>,
   weight = $<metrics.weight>,
   age = $<metrics.age>,
   gender = $<metrics.gender>,
   activity_level = $<metrics.activityLevel>
   `;
   const createResponse = db.none(dbQuery, {
      metrics,
      user_id,
   });
   return createResponse;
};

const update = (metrics: CalculateGoalsArgs, user_id: string | number) => {
   const dbQuery = `
   UPDATE user_daily_goals
   SET height = $<metrics.height>,
   weight = $<metrics.weight>,
   age = $<metrics.age>,
   activity_level = $<metrics.activityLevel>,
   goal_name = $<metrics.goal>,
   gender = $<metrics.gender>
   WHERE user_id = $/user_id/;
   `;
   const updateResponse = db.one(dbQuery, { metrics, user_id });
   return updateResponse;
};

const deleteMetrics = (user_id: string | number) => {
   const dbQuery = `
   DELETE from user_metrics
   WHERE user_id = $/user_id/;`;
   const updateResponse = db.one(dbQuery, { user_id });
   return updateResponse;
};

export { get, create, update, deleteMetrics };
