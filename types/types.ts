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
