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
