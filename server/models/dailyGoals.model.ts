import { pool } from '../database/db';

interface Goals {
   user_id: number;
   total_carbohydrates: number;
   min_carbs_per_meal: number;
   max_carbs_per_meal: number;
   total_protein: number;
   min_protein_per_meal: number;
   max_protein_per_meal: number;
   total_fat: number;
   min_fat_per_meal: number;
   max_fat_per_meal: number;
   total_calories: number;
   min_calories_per_meal: number;
   max_calories_per_meal: number;
}

const createGoals = (goals: Goals) => {
   //get id from req.session then update all goals
   let dbQuery = `INSERT INTO daily_goals (total_carbohydrates, min_carbs_per_meal,
      max_carbs_per_meal, total_protein, min_protein_per_meal, max_protein_per_meal,
      total_fat, min_fat_per_meal, max_fat_per_meal, total_calories, min_calories_per_meal,
      max_calories_per_meal, user_id) VALUES (${goals.total_carbohydrates}, ${goals.min_carbs_per_meal},
         ${goals.max_carbs_per_meal}, ${goals.total_protein}, ${goals.min_protein_per_meal}, ${goals.max_protein_per_meal},
          ${goals.total_fat}, ${goals.min_fat_per_meal}, ${goals.max_fat_per_meal},
           ${goals.total_calories}, ${goals.min_calories_per_meal}, ${goals.max_calories_per_meal}, ${goals.user_id})`;
   let response = pool.query(dbQuery);
   return response;
};

export { createGoals };
