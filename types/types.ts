type CurrentGoals = {
   user_id?: number;
   total_carbohydrates: number;
   min_carbohydrates_per_meal: number;
   max_carbohydrates_per_meal: number;
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

type Session = {
   user_id: string;
   passport: { user: string };
   username: string;
};

type SearchResults = {
   test: any;
};

type Allergies = {
   dairy: boolean;
   eggs: boolean;
   soy: boolean;
   tree_nuts: boolean;
   peanuts: boolean;
   shellfish: boolean;
   fish: boolean;
   wheat: boolean;
};

type Query = {
   query: string;
   category: string;
   allergies: Allergies;
   minCalories: number | string;
   maxCalories: number | string;
   minCarbs: number | string;
   maxCarbs: number | string;
   minProtein: number | string;
   maxProtein: number | string;
   minFat: number | string;
   maxFat: number | string;
   number: number; //number of items to return
   offset: number; //number of results to skip, useful for lazy loading
};

type UserType = {
   username: string;
   email: string;
   password: string;
};

type PassportGoogleUser = {
   username: string;
   email: string;
   id: number;
};

type AddToMealPlanType = {
   date: number;
   slot: number;
   position: number;
   category: string;
   id: number;
   servings: number;
   title: string;
};

type Intolerances = {
   user_id: number;
   intolerances: string;
};

type SelectedDate = {
   date: string;
};

type RequestParams = {
   id: number;
};

export {
   CurrentGoals,
   Session,
   Query,
   UserType,
   AddToMealPlanType,
   Intolerances,
   SelectedDate,
   RequestParams,
   PassportGoogleUser,
   SearchResults,
   Allergies,
};
