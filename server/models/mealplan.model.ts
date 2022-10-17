import { AddToMealPlanType } from '../../types/types';
import { db } from '../database/db';

const createMeal = (mealplan: AddToMealPlanType, user_id: string | number) => {
   console.log('mealplan: ', mealplan);
   const dbQuery = `INSERT INTO user_meal (user_id, fdc_id, slot, 
    data_type, servings, serving_size, serving_size_unit, date, description, brand_owner)
    VALUES ($<user_id>, $<mealplan.fdc_id>, $<mealplan.slot>, $<mealplan.data_type>,
    $<mealplan.servings>, $<mealplan.serving_size>, $<mealplan.serving_size_unit>,
     $<mealplan.date>, $<mealplan.description>, $<mealplan.brand_owner>) 
    RETURNING meal_id
	`;
   return db.task(async (t: any) => {
      const results = await t.one(dbQuery, {
         mealplan,
         user_id,
      });
      const userMealNutritionQuery = `INSERT INTO user_meal_nutrition (meal_id, total_carbohydrates, total_fat, protein, calories,
     dietary_fiber, saturated_fat, trans_fat, sugar, polyunsaturated_fat, monounsaturated_fat,
     cholesterol, sodium, calcium, iron, potassium, vitamin_a, vitamin_c, vitamin_d)
     select $1, (CASE WHEN user_meal.serving_size = 100 THEN food_nutrition.total_carbohydrates * user_meal.servings
	ELSE food_nutrition.total_carbohydrates * food.serving_size_conversion_factor * user_meal.servings
	END) as total_carbohydrates,
	(CASE WHEN user_meal.serving_size = 100 THEN food_nutrition.total_fat * user_meal.servings
	ELSE food_nutrition.total_fat * food.serving_size_conversion_factor * user_meal.servings
	END) as total_fat,
	 (CASE WHEN user_meal.serving_size = 100 THEN food_nutrition.protein * user_meal.servings
	ELSE food_nutrition.protein * food.serving_size_conversion_factor * user_meal.servings
	END) as protein,
	   (CASE WHEN user_meal.serving_size = 100 THEN food_nutrition.calories * user_meal.servings
	ELSE food_nutrition.calories * food.serving_size_conversion_factor * user_meal.servings
	END) as calories,
	   (CASE WHEN user_meal.serving_size = 100 THEN food_nutrition.dietary_fiber * user_meal.servings
	ELSE food_nutrition.dietary_fiber * food.serving_size_conversion_factor * user_meal.servings
	END) as dietary_fiber,
	   (CASE WHEN user_meal.serving_size = 100 THEN food_nutrition.saturated_fat * user_meal.servings
	ELSE food_nutrition.saturated_fat * food.serving_size_conversion_factor * user_meal.servings
	END) as saturated_fat,
	   (CASE WHEN user_meal.serving_size = 100 THEN food_nutrition.trans_fat * user_meal.servings
	ELSE food_nutrition.trans_fat * food.serving_size_conversion_factor * user_meal.servings
	END) as trans_fat,
	   (CASE WHEN user_meal.serving_size = 100 THEN food_nutrition.sugar * user_meal.servings
	ELSE food_nutrition.sugar * food.serving_size_conversion_factor * user_meal.servings
	END) as sugar,
	   (CASE WHEN user_meal.serving_size = 100 THEN food_nutrition.polyunsaturated_fat * user_meal.servings
	ELSE food_nutrition.polyunsaturated_fat * food.serving_size_conversion_factor * user_meal.servings
	END) as polyunsaturated_fat,
	  (CASE WHEN user_meal.serving_size = 100 THEN food_nutrition.monounsaturated_fat * user_meal.servings
	ELSE food_nutrition.monounsaturated_fat * food.serving_size_conversion_factor * user_meal.servings
	END) as monounsaturated_fat,
	  (CASE WHEN user_meal.serving_size = 100 THEN food_nutrition.cholesterol * user_meal.servings
	ELSE food_nutrition.cholesterol * food.serving_size_conversion_factor * user_meal.servings
	END) as cholesterol,
	  (CASE WHEN user_meal.serving_size = 100 THEN food_nutrition.sodium * user_meal.servings
	ELSE food_nutrition.sodium * food.serving_size_conversion_factor * user_meal.servings
	END) as sodium,
	  (CASE WHEN user_meal.serving_size = 100 THEN food_nutrition.calcium * user_meal.servings
	ELSE food_nutrition.calcium * food.serving_size_conversion_factor * user_meal.servings
	END) as calcium,
	  (CASE WHEN user_meal.serving_size = 100 THEN food_nutrition.iron * user_meal.servings
	ELSE food_nutrition.iron * food.serving_size_conversion_factor * user_meal.servings
	END) as iron,
	  (CASE WHEN user_meal.serving_size = 100 THEN food_nutrition.potassium * user_meal.servings
	ELSE food_nutrition.potassium * food.serving_size_conversion_factor * user_meal.servings
	END) as potassium,
	  (CASE WHEN user_meal.serving_size = 100 THEN food_nutrition.vitamin_a * user_meal.servings
	ELSE food_nutrition.vitamin_a * food.serving_size_conversion_factor * user_meal.servings
	END) as vitamin_a,
	  (CASE WHEN user_meal.serving_size = 100 THEN food_nutrition.vitamin_c * user_meal.servings
	ELSE food_nutrition.vitamin_c * food.serving_size_conversion_factor * user_meal.servings
	END) as vitamin_c,
	  (CASE WHEN user_meal.serving_size = 100 THEN food_nutrition.vitamin_d * user_meal.servings
	ELSE food_nutrition.vitamin_d * food.serving_size_conversion_factor * user_meal.servings
	END) as vitamin_d
    FROM user_meal
    INNER JOIN food ON user_meal.fdc_id = food.fdc_id
    INNER JOIN food_nutrition ON food.fdc_id = food_nutrition.fdc_id
    WHERE user_meal.meal_id = $1
        `;

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

const deleteMealItem = (user_id: number | string, mealId: string) => {
   const deleteFoodQuery = `DELETE FROM user_meal 
		WHERE meal_id = $1 AND user_id = $2`;
   return db.none(deleteFoodQuery, [mealId, user_id]);
};

const getRandomFoods = () => {
   const randomInt = Math.floor(Math.random() * 1500);
   const getRandomDayQuery = `
		SELECT data_type,
		description,
		brand_owner
		serving_size, 
		serving_size_unit, 
		food.fdc_id,  
		row_to_json(food_nutrition) AS nutrition 
		FROM food INNER JOIN food_nutrition ON food.fdc_id = food_nutrition.fdc_id
		INNER JOIN branded_food ON branded_food.fdc_id = food.fdc_id
		WHERE calories is NOT null and brand_owner is not null
		OFFSET $1 LIMIT 3`;
   return db.any(getRandomDayQuery, randomInt);
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
   createMeal,
   getByDay,
   getNutritionSummaryByDay,
   deleteMealItem,
   getRandomFoods,
   getSampleFoods,
   getSampleFoodsNutritionSummary,
};
