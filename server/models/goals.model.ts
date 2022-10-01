import { CurrentGoals } from '../../types/types';
import { db } from '../database/db';

const get = (user_id: string) => {
   const dbQuery = `SELECT total_carbohydrates,
    total_protein, total_fat, total_calories,
    user_id FROM user_daily_goals WHERE user_id = '${user_id}'`;
   const getResponse = db.query(dbQuery);
   return getResponse;
};

const create = (goals: CurrentGoals) => {
   const dbQuery = `
   INSERT INTO user_daily_goals (total_carbohydrates, 
   total_protein, total_fat, total_calories, user_id)
   VALUES (${goals.total_carbohydrates}, 
      ${goals.total_protein},
      ${goals.total_fat}, 
      ${goals.total_calories}, '${goals.user_id}')
   ON CONFLICT (user_id) 
   DO UPDATE SET
   total_carbohydrates = ${goals.total_carbohydrates},
   total_calories = ${goals.total_calories},
   total_protein = ${goals.total_protein},
   total_fat = ${goals.total_fat}
   `;
   const createResponse = db.query(dbQuery);
   return createResponse;
};

const update = (goals: CurrentGoals) => {
   const dbQuery = `
   UPDATE user_daily_goals
   SET total_carbohydrates = ${goals.total_carbohydrates},
   total_protein = ${goals.total_protein},
   total_fat = ${goals.total_fat},
   total_calories = ${goals.total_calories},
   WHERE user_id = ${goals.user_id}
   `;
   const updateResponse = db.query(dbQuery);
   return updateResponse;
};

export { get, create, update };
