import { CurrentGoals } from '../../types/types';
import { db } from '../database/db';

const get = (user_id: string) => {
   const dbQuery = `SELECT total_carbohydrates, min_carbohydrates_per_meal,
    max_carbohydrates_per_meal, total_protein,
      min_protein_per_meal, max_protein_per_meal,
      total_fat, min_fat_per_meal, max_fat_per_meal,
      total_calories, min_calories_per_meal, max_calories_per_meal,
      user_id FROM user_daily_goals WHERE user_id = '${user_id}'`;
   const getResponse = db.query(dbQuery);
   return getResponse;
};

const create = (goals: CurrentGoals) => {
   const dbQuery = `
   INSERT INTO user_daily_goals (total_carbohydrates, min_carbohydrates_per_meal,
      max_carbohydrates_per_meal, total_protein, min_protein_per_meal, max_protein_per_meal,
      total_fat, min_fat_per_meal, max_fat_per_meal, total_calories, min_calories_per_meal,
      max_calories_per_meal, user_id)
   VALUES (${goals.total_carbohydrates}, ${goals.min_carbohydrates_per_meal},
      ${goals.max_carbohydrates_per_meal}, ${goals.total_protein}, ${goals.min_protein_per_meal}, ${goals.max_protein_per_meal},
      ${goals.total_fat}, ${goals.min_fat_per_meal}, ${goals.max_fat_per_meal},
      ${goals.total_calories}, ${goals.min_calories_per_meal}, ${goals.max_calories_per_meal}, '${goals.user_id}')
   `;
   const createResponse = db.query(dbQuery);
   return createResponse;
};

const update = (goals: CurrentGoals) => {
   const dbQuery = `
   UPDATE user_daily_goals
   SET total_carbohydrates = ${goals.total_carbohydrates},
   min_carbohydrates_per_meal = ${goals.min_carbohydrates_per_meal},
   max_carbohydrates_per_meal = ${goals.max_carbohydrates_per_meal},
   total_protein = ${goals.total_protein},
   min_protein_per_meal = ${goals.min_protein_per_meal},
   max_protein_per_meal = ${goals.max_protein_per_meal},
   total_fat = ${goals.total_fat},
   min_fat_per_meal = ${goals.min_fat_per_meal},
   max_fat_per_meal = ${goals.max_fat_per_meal},
   total_calories = ${goals.total_calories},
   min_calories_per_meal = ${goals.min_calories_per_meal},
   max_calories_per_meal = ${goals.max_calories_per_meal}
   WHERE user_id = ${goals.user_id}
   `;
   const updateResponse = db.query(dbQuery);
   return updateResponse;
};

export { get, create, update };
