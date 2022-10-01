type CurrentGoals = {
   user_id?: number;
   goal: 'weight_loss' | 'gain_muscle' | 'maintain';
   total_calories: number;
   total_carbohydrates: number;
   total_protein: number;
   total_fat: number;
};

type Session = {
   user_id: string;
   passport: { user: string };
   username: string;
};

type SearchResults = {
   test: any;
};

type Query = {
   query: string;
   category: string;
   allergy: string;
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

type MetricsType = {
   age: number;
   goal: 'weight_loss' | 'gain_muscle' | 'maintain';
   weight: number;
   gender: string;
   height: number;
   activityLevel: number;
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
   MetricsType,
};
