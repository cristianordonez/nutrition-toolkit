export type MenuItemNutrition = {
   calories: number;
   carbs: string;
   fat: string;
   protein: string;
   nutrients: [
      {
         name: string;
         amount: number;
         unit: string;
         percentOfDailyNeeds: number;
      }
   ];
};

export type RecipeItemNutrition = {
   nutrients: [];
};

export type ValuesType = {
   query: string;
   type: string;
   intolerance: string;
   minCalories: string;
   maxCalories: string;
   minProtein: string;
   maxProtein: string;
   minCarbs: string;
   maxCarbs: string;
   minFat: string;
   maxFat: string;
   number: number;
   offset: number;
};
export interface Recipe {
   aggregateLikes: number;
   id: number;
   image: string;
   servings: number;
   title: string;
   sourceUrl: string;
   spoonacularSourceUrl: string;
   summary: string; //provides unnecessary information
   readyInMinutes: number;
   vegetarian: boolean;
   dishTypes: string[];
   vegan: boolean;
   cheap: boolean;
   instructions: string;
   sustainable: boolean;
   dairyFree: boolean;
   veryHealthy: boolean;
   veryPopular: boolean;
   lowFodmap: boolean;
   diets: string[];
   restaurantChain?: string | undefined;
   nutrition?: undefined;
}

export type GroceryItemNutrition = {
   calories: number;
   carbs: string;
   fat: string;
   protein: string;
};

export interface GroceryItemType {
   id: number;
   image: string;
   imageType: string;
   title: string;
   nutrition: RecipeItemNutrition | GroceryItemNutrition | MenuItemNutrition;
}

export interface RecipeItemType extends GroceryItemType {
   sourceUrl: string;
   spoonacularSourceUrl: string;
   servings: number;
}

export interface MenuItemType extends RecipeItemType {
   restaurantChain: string;
   servingSize: string;
}

export interface FoodItemType extends MenuItemType {}

export type CurrentGoals = {
   user_id?: number;
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
};

export type Session = {
   user_id: string;
   passport: { user: string };
   username: string;
};

export type Query = {
   query: string;
   type: string;
   intolerance: string;
   minCalories: number;
   maxCalories: number;
   minCarbs: number;
   maxCarbs: number;
   minProtein: number;
   maxProtein: number;
   minFat: number;
   maxFat: number;
   number: number; //number of items to return
   offset: number; //number of results to skip, useful for lazy loading
};

export type SampleMealplanItem = {
   id: number;
   imageTtype: string;
   readyInMinutes: number;
   servings: number;
   sourceUrl: string;
   title: string;
};

export type MealplanItemType = {
   id: number;
   position: number;
   slot: number;
   type: string;
   value: {
      id: number;
      imageType: string;
      servings: number;
      title: string;
   };
};

export type RouteValues = {
   query: string;
   type: string;
   minCalories: string;
   maxCalories: string;
   minProtein: string;
   maxProtein: string;
   minCarbs: string;
   maxCarbs: string;
   minFat: string;
   maxFat: string;
   offset: number;
   number: number;
};

export type UserType = {
   username: string;
   email: string;
   password: string;
};

export type AccountType = {
   status: string;
   username: string;
   spoonacularPassword: string;
   hash: string;
};

export type QueryType = {
   query: string;
   type: string;
   intolerance: string;
   minCalories: number;
   maxCalories: number;
   minCarbs: number;
   maxCarbs: number;
   minProtein: number;
   maxProtein: number;
   minFat: number;
   maxFat: number;
   number: number; //number of items to return
   offset: number; //number of results to skip, useful for lazy loading
};

export type addToMealPlanType = {
   date?: number | undefined;
   slot?: number | undefined;
   position?: number | undefined;
   type?: string | undefined;
   value?: {
      id: number | undefined;
      servings: number | undefined;
      title: string | undefined;
      imageType: string | undefined;
   };
};
