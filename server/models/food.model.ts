import { Query } from '../../types/types';
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
   const selectQuery = `SELECT * FROM food_nutrition_info
      WHERE description ~* '${query.query}' 
      AND 'calories' IS NOT null
      LIMIT ${query.number} OFFSET ${query.offset}
      `;
   const matchingItems = db.query(selectQuery);
   return matchingItems;
};

const getAdvanced = (query: Query) => {
   const selectContentsQuery = `SELECT * FROM food_nutrition_info
   WHERE description ~* '${query.query}' 
   AND 'calories' BETWEEN ${query.minCalories} AND ${query.maxCalories}
   AND 'total_fat' BETWEEN ${query.minFat} AND ${query.maxFat}
   AND 'protein' BETWEEN ${query.minProtein} AND ${query.maxProtein} 
   AND 'total_carbohydrates' BETWEEN ${query.minCarbs} AND ${query.maxCarbs}
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

const createFood = () => {};

const updateNutritionCustomFoods = () => {};

export { get, getAdvanced, createFood, updateNutritionCustomFoods };
