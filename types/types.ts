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
   date: Date | string;
   slot: 1 | 2 | 3 | 4;
   data_type: string;
   fdc_id: number;
   servings: number | string;
   serving_size: number;
   serving_size_unit: string;
   ingredients: string;
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

type FoodSearchResultNutrition = {
   calories: number;
   calcium: number;
   cholesterol: number;
   dietary_fiber: number;
   iron: number;
   potassium: number;
   protein: number;
   saturated_fat: number;
   monounsaturated_fat: number;
   polyunsaturated_fat: number;
   sodium: number;
   sugar: number;
   total_carbohydrates: number;
   total_fat: number;
   trans_fat: number;
   vitamin_a: number;
   vitamin_c: number;
   vitamin_d: number;
};

type FoodSearchResult = {
   brand_name: string | null;
   brand_owner: string | null;
   branded_food_category: string | null;
   ingredients: string;
   description: string;
   fdc_id: string;
   serving_size: number;
   serving_size_unit: string;
   data_type: string;
   nutrition: FoodSearchResultNutrition;
};

type NutritionSummaryMealplan = {
   total_calories: string;
   total_carbohydrates: string;
   total_fat: string;
   total_protein: string;
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
   FoodSearchResult,
   FoodSearchResultNutrition,
   NutritionSummaryMealplan,
   MetricsType,
};
