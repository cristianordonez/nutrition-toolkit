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
   modifier,
   gram_weight,
	custom_food.brand_owner as custom_food_brand_owner,
   custom_food.serving_size AS custom_food_serving_size,
   custom_food.serving_size_unit AS custom_food_serving_size_unit,
 	branded_food.serving_size,
   branded_food.serving_size_unit,
   food.data_type,
   row_to_json(food_nutrition.*) AS nutrition
   FROM food
 	INNER JOIN food_nutrition ON food.fdc_id = food_nutrition.fdc_id
   LEFT JOIN branded_food ON food.fdc_id = branded_food.fdc_id
   LEFT JOIN custom_food on custom_food.fdc_id = food.fdc_id
   LEFT JOIN food_portion on food.fdc_id = food_portion.fdc_id
   WHERE description ~* '${query.query}'
   AND calories IS NOT null
 	LIMIT ${query.number} OFFSET ${query.offset}
      `;
   const matchingItems = db.query(selectQuery);
   return matchingItems;
};

const getByBrand = (query: Query) => {
   const selectQuery = `SELECT 
 	food.fdc_id, 
 	food.description, 
 	branded_food.brand_owner,
	custom_food.brand_name as custom_food_brand_owner,
   custom_food.serving_size AS custom_food_serving_size,
   custom_food.serving_size_unit AS custom_food_serving_size_unit,
 	branded_food.serving_size,
   branded_food.serving_size_unit,
   food.data_type,
   row_to_json(food_nutrition.*) AS nutrition
   FROM food
 	INNER JOIN food_nutrition ON food.fdc_id = food_nutrition.fdc_id
   LEFT JOIN branded_food ON food.fdc_id = branded_food.fdc_id
   LEFT JOIN custom_food on custom_food.fdc_id = food.fdc_id
   WHERE (branded_food.brand_owner ~* '${query.query}' OR custom_food.brand_owner ~* '${query.query}')
 	LIMIT ${query.number} OFFSET ${query.offset}
      `;
   const matchingItems = db.query(selectQuery);
   return matchingItems;
};

const getAdvanced = (query: Query) => {
   const selectContentsQuery = `SELECT 
    food.fdc_id,
    food.description,
    branded_food.brand_owner,
    custom_food.brand_owner as custom_food_brand_owner,
    custom_food.serving_size AS custom_food_serving_size,
    custom_food.serving_size_unit AS custom_food_serving_size_unit,
    branded_food.serving_size,
    branded_food.serving_size_unit,
    food.data_type,
    row_to_json(food_nutrition.*) AS nutrition
    FROM food
	 INNER JOIN food_nutrition ON food.fdc_id = food_nutrition.fdc_id
    LEFT JOIN branded_food ON food.fdc_id = branded_food.fdc_id
    LEFT JOIN custom_food on custom_food.fdc_id = food.fdc_id
    WHERE description ~* '${query.query}' 
    AND calories BETWEEN ${Number(query.minCalories)} AND ${Number(
      query.maxCalories
   )}
   AND total_fat BETWEEN ${Number(query.minFat)} AND ${Number(query.maxFat)}
   AND protein BETWEEN ${Number(query.minProtein)} AND ${Number(
      query.maxProtein
   )} 
   AND total_carbohydrates BETWEEN ${Number(query.minCarbs)} AND ${Number(
      query.maxCarbs
   )}
   `;
   const allergyQuery =
      query.allergy === '' ? '' : allergyMap[query.allergy as keyof AllergyMap];
   const limitQuery = `LIMIT ${query.number} OFFSET ${query.offset}`;
   const currentQuery = selectContentsQuery + allergyQuery + limitQuery;
   const matchingItems = db.query(
      selectContentsQuery + allergyQuery + limitQuery
   );
   return matchingItems;
};

const getAdvancedByBrand = (query: Query) => {
   const selectContentsQuery = `SELECT 
    food.fdc_id,
    food.description,
    branded_food.brand_owner,
    custom_food.brand_owner as custom_food_brand_owner,
    custom_food.serving_size AS custom_food_serving_size,
    custom_food.serving_size_unit AS custom_food_serving_size_unit,
    branded_food.serving_size,
    branded_food.serving_size_unit,
    food.data_type,
    row_to_json(food_nutrition.*) AS nutrition
    FROM food
	 INNER JOIN food_nutrition ON food.fdc_id = food_nutrition.fdc_id
    LEFT JOIN branded_food ON food.fdc_id = branded_food.fdc_id
    LEFT JOIN custom_food on custom_food.fdc_id = food.fdc_id
    WHERE (branded_food.brand_owner ~* '${
       query.query
    }' OR custom_food.brand_owner ~* '${query.query}') 
    AND calories BETWEEN ${Number(query.minCalories)} AND ${Number(
      query.maxCalories
   )}
   AND total_fat BETWEEN ${Number(query.minFat)} AND ${Number(query.maxFat)}
   AND protein BETWEEN ${Number(query.minProtein)} AND ${Number(
      query.maxProtein
   )} 
   AND total_carbohydrates BETWEEN ${Number(query.minCarbs)} AND ${Number(
      query.maxCarbs
   )}
   `;
   const allergyQuery =
      query.allergy === '' ? '' : allergyMap[query.allergy as keyof AllergyMap];
   const limitQuery = `LIMIT ${query.number} OFFSET ${query.offset}`;
   const currentQuery = selectContentsQuery + allergyQuery + limitQuery;
   const matchingItems = db.query(
      selectContentsQuery + allergyQuery + limitQuery
   );
   return matchingItems;
};

const createFood = (
   description: string,
   serving_size_conversion_factor: number,
   brand_owner: string,
   serving_size: number | string,
   serving_size_unit: string,
   user_id: number
) => {
   const createFoodQuery = `With getId AS 
   (INSERT INTO food (data_type, description, serving_size_conversion_factor) 
   VALUES ('custom', '${description}', ${serving_size_conversion_factor}) 
   RETURNING fdc_id)
   INSERT INTO custom_food 
   (brand_owner, serving_size, serving_size_unit, fdc_id, user_id) 
   VALUES ('${brand_owner}', ${serving_size}, '${serving_size_unit}', (SELECT fdc_id FROM getId), ${user_id})
   RETURNING fdc_id`;

   console.log('createFoodQuery: ', createFoodQuery);
   const serialIdFood = db.query(createFoodQuery);
   return serialIdFood;
};

//all items in food_nutrition table are per 100 g, so use standardized_conversion_factor to convert before inserting
const createFoodNutrition = (
   nutrition: FoodNutrition,
   fdc_id: number,
   standardized_conversion_factor: number
) => {
   const createFoodNutritionQuery = `INSERT INTO food_nutrition 
   (fdc_id, calories, total_fat, total_carbohydrates, protein, trans_fat,
   polyunsaturated_fat, monounsaturated_fat, cholesterol, dietary_fiber,
   sugar, vitamin_d, calcium, saturated_fat, sodium, iron, potassium, vitamin_a, vitamin_c)
   VALUES (${fdc_id}, ${
      Number(nutrition.calories) * standardized_conversion_factor
   }, 
   ${Number(nutrition.total_fat) * standardized_conversion_factor},
   ${Number(nutrition.total_carbohydrates) * standardized_conversion_factor},
   ${Number(nutrition.protein) * standardized_conversion_factor},
   ${Number(nutrition.trans_fat) * standardized_conversion_factor},
   ${Number(nutrition.polyunsaturated_fat) * standardized_conversion_factor},
   ${Number(nutrition.monounsaturated_fat) * standardized_conversion_factor},
   ${Number(nutrition.cholesterol) * standardized_conversion_factor},
   ${Number(nutrition.dietary_fiber) * standardized_conversion_factor},
   ${Number(nutrition.sugar) * standardized_conversion_factor},
   ${Number(nutrition.vitamin_d) * standardized_conversion_factor},
   ${Number(nutrition.calcium) * standardized_conversion_factor},
   ${Number(nutrition.saturated_fat) * standardized_conversion_factor},
   ${Number(nutrition.sodium) * standardized_conversion_factor},
   ${Number(nutrition.iron) * standardized_conversion_factor},
   ${Number(nutrition.potassium) * standardized_conversion_factor},
   ${Number(nutrition.vitamin_a) * standardized_conversion_factor},
   ${Number(nutrition.vitamin_c) * standardized_conversion_factor})`;

   const dbResponse = db.query(createFoodNutritionQuery);
   return dbResponse;
};

const getSampleItems = () => {
   const getSampleItemsQuery = `SELECT food.fdc_id, 
 	food.description, 
 	branded_food.brand_owner,
   modifier,
   gram_weight,
 	branded_food.serving_size,
   branded_food.serving_size_unit,
   food.data_type,
   row_to_json(food_nutrition.*) AS nutrition
   FROM food
 	INNER JOIN food_nutrition ON food.fdc_id = food_nutrition.fdc_id
   LEFT JOIN branded_food ON food.fdc_id = branded_food.fdc_id
   LEFT JOIN food_portion on food.fdc_id = food_portion.fdc_id
   WHERE calories IS NOT null
   AND data_type = 'branded_food'
   LIMIT 10`;

   return db.query(getSampleItemsQuery);
};

export {
   get,
   getByBrand,
   getAdvanced,
   getAdvancedByBrand,
   createFood,
   createFoodNutrition,
   getSampleItems,
};
