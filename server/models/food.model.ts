import { FoodNutrition, Query } from '../../types/types';
import { db } from '../database/db';

interface AllergyMap {
   dairy: string;
   eggs: string;
   soy: string;
   tree_nuts: string;
   peanuts: string;
   shellfish: string;
   fish: string;
   wheat: string;
}

const allergyMap = {
   dairy: `AND ingredients !~* 'cheese'
   AND ingredients !~* 'butter'
   AND ingredients !~* 'casein'
   AND ingredients !~* 'cream'
   AND ingredients !~* 'milk'
   AND ingredients !~* 'lactose'
   AND ingredients !~* 'yogurt'
   AND ingredients !~* 'whey'
   AND ingredients !~* 'dairy'
   `,
   eggs: `AND ingredients !~* 'albumin'
   AND ingredients !~* 'egg'
   AND ingredients !~* 'meringue'
   AND ingredients !~* 'ovo'
   AND ingredients !~* 'surimi'
   AND ingredients !~* 'vitellin'
   AND ingredients !~* 'globulin'
   AND ingredients !~* 'mayonnaise'
   `,
   soy: `AND ingredients !~* 'soy'
   AND ingredients !~* 'edamame'
   AND ingredients !~* 'natto'
   AND ingredients !~* 'tofu'
   AND ingredients !~* 'tamari'
   AND ingredients !~* 'tempeh'
   `,
   tree_nuts: `AND ingredients !~* 'almond'
   AND ingredients !~* 'nut'
   AND ingredients !~* 'cashew'
   AND ingredients !~* 'pecan'
   AND ingredients !~* 'pistachio'
   `,
   peanuts: `AND ingredients !~* 'nut'
   AND ingredients !~* 'lupin'
   `,
   shellfish: `AND ingredients !~* 'barnacle'
   AND ingredients !~* 'crab'
   AND ingredients !~* 'crawfish'
   AND ingredients !~* 'krill'
   AND ingredients !~* 'lobster'
   AND ingredients !~* 'prawns'
   AND ingredients !~* 'shrimp'
   AND ingredients !~* 'mollusk'
   AND ingredients !~* 'shellfish'
   `,
   fish: `AND ingredients !~* 'fish'
   AND ingredients !~* 'anchovies'
   AND ingredients !~* 'pike'
   AND ingredients !~* 'pollock'
   AND ingredients !~* 'salmon'
   AND ingredients !~* 'sole'
   AND ingredients !~* 'snapper'
   AND ingredients !~* 'bass'
   AND ingredients !~* 'flounder'
   AND ingredients !~* 'mahi'
   AND ingredients !~* 'tilapia'
   AND ingredients !~* 'tuna'
   AND ingredients !~* 'trout'
   AND ingredients !~* 'salmon'
   AND ingredients !~* 'haddock'
   AND ingredients !~* 'herring'
   AND ingredients !~* 'cod'
   `,
   wheat: `AND ingredients !~* 'bran'
   AND ingredients !~* 'pasta'
   AND ingredients !~* 'bread'
   AND ingredients !~* 'cereal'
   AND ingredients !~* 'cracker'
   AND ingredients !~* 'wheat'
   AND ingredients !~* 'bulgur'
   AND ingredients !~* 'couscous'
   AND ingredients !~* 'flour'
   AND ingredients !~* 'gluten'
   AND ingredients !~* 'matzo'
   `,
};

const get = (query: Query) => {
   const selectQuery = `SELECT 
 	food.fdc_id, 
 	food.description, 
 	branded_food.brand_owner,
   custom_food.brand_owner as custom_food_brand_owner,
   food.nutrition_label_serving_size as serving_size,
   food.nutrition_label_serving_size_unit as serving_size_unit,
   food.data_type,
   row_to_json(food_nutrition.*) AS nutrition
   FROM food
 	INNER JOIN food_nutrition ON food.fdc_id = food_nutrition.fdc_id
   LEFT JOIN branded_food ON food.fdc_id = branded_food.fdc_id
   LEFT JOIN custom_food on custom_food.fdc_id = food.fdc_id
   WHERE description ~* $<query.query>
   AND calories IS NOT null
 	LIMIT $<query.number> OFFSET $<query.offset>
      `;
   const matchingItems = db.any(selectQuery, {
      query: query,
   });
   return matchingItems;
};

const getAdvanced = (query: Query) => {
   const selectContentsQuery = `SELECT 
    food.fdc_id,
    food.description,
    branded_food.brand_owner,
    custom_food.brand_owner as custom_food_brand_owner,
    food.nutrition_label_serving_size AS serving_size,
    food.nutrition_label_serving_size_unit AS serving_size_unit,
    food.data_type,
    row_to_json(food_nutrition.*) AS nutrition
    FROM food
	 INNER JOIN food_nutrition ON food.fdc_id = food_nutrition.fdc_id
    LEFT JOIN branded_food ON food.fdc_id = branded_food.fdc_id
    LEFT JOIN custom_food on custom_food.fdc_id = food.fdc_id
    WHERE description ~* $<query.query> 
    AND calories BETWEEN $<query.minCalories> AND $<query.maxCalories>
   AND total_fat BETWEEN $<query.minFat> AND $<query.maxFat>
   AND protein BETWEEN $<query.minProtein> AND $<query.maxProtein> 
   AND total_carbohydrates BETWEEN $<query.minCarbs> AND $<query.maxCarbs>
   `;
   const allergyQuery =
      query.allergy === '' ? '' : allergyMap[query.allergy as keyof AllergyMap];
   const limitQuery = `LIMIT $<query.number> OFFSET $<query.offset>`;
   const currentQuery = selectContentsQuery + allergyQuery + limitQuery;
   const matchingItems = db.any(currentQuery, {
      query: query,
   });
   return matchingItems;
};

const getAdvancedByBrand = (query: Query) => {
   const selectContentsQuery = `SELECT 
    food.fdc_id,
    food.description,
    branded_food.brand_owner,
    custom_food.brand_owner as custom_food_brand_owner,
    food.nutrition_label_serving_size AS serving_size,
    food.nutrition_label_serving_size_unit AS serving_size_unit,
    food.data_type,
    row_to_json(food_nutrition.*) AS nutrition
    FROM food
	 INNER JOIN food_nutrition ON food.fdc_id = food_nutrition.fdc_id
    LEFT JOIN branded_food ON food.fdc_id = branded_food.fdc_id
    LEFT JOIN custom_food on custom_food.fdc_id = food.fdc_id
    WHERE (branded_food.brand_owner ~* $<query.query> OR custom_food.brand_owner ~* $<query.query>) 
    AND calories BETWEEN $<query.minCalories> AND $<query.maxCalories>
   AND total_fat BETWEEN $<query.minFat> AND $<query.maxFat>
   AND protein BETWEEN $<query.minProtein> AND $<query.maxProtein>
   AND total_carbohydrates BETWEEN $<query.minCarbs> AND $<query.maxCarbs>
   `;
   const allergyQuery =
      query.allergy === '' ? '' : allergyMap[query.allergy as keyof AllergyMap];
   const limitQuery = `LIMIT $<query.number> OFFSET $<query.offset>`;
   const currentQuery = selectContentsQuery + allergyQuery + limitQuery;
   const matchingItems = db.any(currentQuery, {
      query: query,
   });
   return matchingItems;
};

const createFood = (
   description: string,
   brand_owner: string,
   serving_size: number | string,
   serving_size_unit: string,
   user_id: number | string,
   nutrition: FoodNutrition,
   standardized_conversion_factor: number
) => {
   const createFoodQuery = `With getId AS 
   (INSERT INTO food (data_type, description, 
   nutrition_label_serving_size, nutrition_label_serving_size_unit) 
   VALUES ('custom', $1, $2, $3) 
   RETURNING fdc_id)
   INSERT INTO custom_food 
   (brand_owner, user_id, fdc_id) 
   VALUES ($4, $5, (SELECT fdc_id FROM getId))
   RETURNING fdc_id`;

   console.log('brand_owner: ', brand_owner);
   console.log('serving_size: ', serving_size);
   console.log('nutrition: ', nutrition);
   console.log('serving_size_unit: ', serving_size_unit);
   console.log('user_id: ', user_id);

   return db.task(async (t: any) => {
      const fdc_id = await t.one(createFoodQuery, [
         description,
         serving_size,
         serving_size_unit,
         brand_owner,
         user_id,
      ]);
      Object.keys(nutrition).forEach((nutrient) => {
         if (
            nutrition[nutrient as keyof typeof nutrition] !== '' &&
            nutrition !== null
         ) {
            nutrition[nutrient as keyof typeof nutrition] =
               standardized_conversion_factor *
               Number(nutrition[nutrient as keyof typeof nutrition]);
         } else {
            nutrition[nutrient as keyof typeof nutrition] = null;
         }
      });
      const createFoodNutritionQuery = `INSERT INTO food_nutrition 
         (fdc_id, calories, total_fat, total_carbohydrates, protein, trans_fat,
         cholesterol, dietary_fiber,
         total_sugars, vitamin_d, calcium, saturated_fat, sodium, iron, potassium)
         VALUES ($<fdc_id.fdc_id>, $<nutrition.calories>, 
         $<nutrition.total_fat>,
         $<nutrition.total_carbohydrates>,
         $<nutrition.protein>,
         $<nutrition.trans_fat>,
         $<nutrition.cholesterol>,
         $<nutrition.dietary_fiber>,
         $<nutrition.total_sugars>,
         $<nutrition.vitamin_d>,
         $<nutrition.calcium>,
         $<nutrition.saturated_fat>,
         $<nutrition.sodium>,
         $<nutrition.iron>,
         $<nutrition.potassium>) RETURNING fdc_id`;
      const nutritionFdcId = await t.one(createFoodNutritionQuery, {
         nutrition,
         fdc_id,
         standardized_conversion_factor,
      });
      return nutritionFdcId;
   });
};

const getSampleItems = () => {
   const getSampleItemsQuery = `SELECT food.fdc_id, 
 	food.description, 
 	branded_food.brand_owner,
   food.nutrition_label_serving_size AS serving_size,
   food.nutrition_label_serving_size_unit AS serving_size_unit,
   food.data_type,
   row_to_json(food_nutrition.*) AS nutrition
   FROM food
 	INNER JOIN food_nutrition ON food.fdc_id = food_nutrition.fdc_id
   LEFT JOIN branded_food ON food.fdc_id = branded_food.fdc_id
   WHERE calories IS NOT null
   AND data_type = 'branded_food'
   LIMIT 10`;

   return db.query(getSampleItemsQuery);
};

export { get, getAdvanced, getAdvancedByBrand, createFood, getSampleItems };
