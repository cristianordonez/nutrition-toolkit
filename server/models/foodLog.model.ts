import { AddToFoodLogType } from '../../types/types';
import { db } from '../database/db';

const createFoodLogItem = (
   foodLog: AddToFoodLogType,
   user_id: string | number
) => {
   //eslint-disable-next-line
   return db.task(async (t: any) => {
      const dbQuery = `INSERT INTO user_meal (user_id, fdc_id, slot, 
		data_type, servings, serving_size, serving_size_unit, date, description, brand_owner)
		VALUES ($<user_id>, $<foodLog.fdc_id>, $<foodLog.slot>, $<foodLog.data_type>,
		$<foodLog.servings>, $<foodLog.serving_size>, $<foodLog.serving_size_unit>,
		$<foodLog.date>, $<foodLog.description>, $<foodLog.brand_owner>) 
		RETURNING meal_id`;
      //eslint-disable-next-line
      const results = await t.one(dbQuery, {
         foodLog,
         user_id,
      });
      const userMealNutritionQuery = `INSERT INTO user_meal_nutrition (meal_id, total_carbohydrates, total_fat, protein, calories,
     dietary_fiber, saturated_fat, trans_fat, total_sugars,
     cholesterol, sodium, calcium, iron, potassium, vitamin_d)
     select $1, ((food_nutrition.total_carbohydrates / 100) * user_meal.serving_size * user_meal.servings) AS total_carbohydrates,
	((food_nutrition.total_fat / 100) * user_meal.serving_size * user_meal.servings) AS total_fat,
	((food_nutrition.protein / 100) * user_meal.serving_size * user_meal.servings) AS protein,
	((food_nutrition.calories / 100) * user_meal.serving_size * user_meal.servings) AS calories,
	((food_nutrition.dietary_fiber / 100) * user_meal.serving_size * user_meal.servings) AS dietary_fiber,
	((food_nutrition.saturated_fat / 100) * user_meal.serving_size * user_meal.servings) AS saturated_fat,
	((food_nutrition.trans_fat / 100) * user_meal.serving_size * user_meal.servings) AS trans_fat,
	((food_nutrition.total_sugars / 100) * user_meal.serving_size * user_meal.servings) AS total_sugars,
	((food_nutrition.cholesterol / 100) * user_meal.serving_size * user_meal.servings) AS cholesterol,
	((food_nutrition.sodium / 100) * user_meal.serving_size * user_meal.servings) AS sodium,
	((food_nutrition.calcium / 100) * user_meal.serving_size * user_meal.servings) AS calcium,
	((food_nutrition.iron / 100) * user_meal.serving_size * user_meal.servings) AS iron,
	((food_nutrition.potassium / 100) * user_meal.serving_size * user_meal.servings) AS potassium,
	((food_nutrition.vitamin_d / 100) * user_meal.serving_size * user_meal.servings) AS vitamin_d
    FROM user_meal
    INNER JOIN food ON user_meal.fdc_id = food.fdc_id
    INNER JOIN food_nutrition ON food.fdc_id = food_nutrition.fdc_id
    WHERE user_meal.meal_id = $1`;
      //eslint-disable-next-line
      await t.none(userMealNutritionQuery, results.meal_id);
   });
};

const getByDay = (date: Date | string, user_id: number | string) => {
   const getMealsAndNutritionQuery = `SELECT
	user_meal.meal_id, slot, data_type, servings, serving_size, serving_size_unit, date, fdc_id, 
   	description, brand_owner, row_to_json(user_meal_nutrition) 
	AS nutrition FROM user_meal INNER JOIN user_meal_nutrition ON user_meal.meal_id = user_meal_nutrition.meal_id 
	WHERE user_id = $1 AND date = $2
	ORDER BY created_at ASC `;
   const response = db.any(getMealsAndNutritionQuery, [user_id, date]);
   return response;
};

const getNutritionSummaryByDay = (
   date: Date | string,
   user_id: number | string
) => {
   const getSummaryQuery = `SELECT 
    COALESCE(SUM(calories), 0) AS total_calories,
	COALESCE(SUM(total_carbohydrates), 0) AS total_carbohydrates,
	COALESCE(SUM(total_fat), 0) AS total_fat,
	COALESCE(SUM(protein), 0) AS total_protein
	FROM user_meal_nutrition INNER JOIN user_meal ON user_meal.meal_id = user_meal_nutrition.meal_id 
	WHERE user_id = $1
	AND date = $2`;
   const nutritionSummary = db.oneOrNone(getSummaryQuery, [user_id, date]);
   return nutritionSummary;
};

const deleteFoodLogItem = (user_id: number | string, mealId: string) => {
   const deleteFoodQuery = `DELETE FROM user_meal 
		WHERE meal_id = $1 AND user_id = $2`;
   return db.none(deleteFoodQuery, [mealId, user_id]);
};

const getSampleFoods = () => {
   const getSampleQuery = `
	SELECT
	sample_user_meal.meal_id, slot, data_type, servings, serving_size, serving_size_unit, fdc_id, 
   	description, brand_owner, row_to_json(sample_user_meal_nutrition) 
	AS nutrition FROM sample_user_meal INNER JOIN sample_user_meal_nutrition ON sample_user_meal.meal_id = sample_user_meal_nutrition.meal_id 
	`;
   return db.query(getSampleQuery);
};

const getSampleFoodsNutritionSummary = () => {
   const getSampleNutritionSummaryQuery = `
	SELECT 
    COALESCE(SUM(calories), 0) AS total_calories,
	COALESCE(SUM(total_carbohydrates), 0) AS total_carbohydrates,
	COALESCE(SUM(total_fat), 0) AS total_fat,
	COALESCE(SUM(protein), 0) AS total_protein
	FROM sample_user_meal_nutrition INNER JOIN sample_user_meal ON sample_user_meal.meal_id = sample_user_meal_nutrition.meal_id 
	`;
   return db.query(getSampleNutritionSummaryQuery);
};

export {
   createFoodLogItem,
   getByDay,
   getNutritionSummaryByDay,
   deleteFoodLogItem,
   getSampleFoods,
   getSampleFoodsNutritionSummary,
};
