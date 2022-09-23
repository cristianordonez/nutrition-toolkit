type MenuItemNutrition = {
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

type RecipeItemNutrition = {
   nutrients: [];
};

type ValuesType = {
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
interface Recipe {
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

type GroceryItemNutrition = {
   calories: number;
   carbs: string;
   fat: string;
   protein: string;
};

interface GroceryItemType {
   id: number;
   image: string;
   imageType: string;
   title: string;
   nutrition: RecipeItemNutrition | GroceryItemNutrition | MenuItemNutrition;
}

interface RecipeItemType extends GroceryItemType {
   sourceUrl: string;
   spoonacularSourceUrl: string;
   servings: number;
}

interface MenuItemType extends RecipeItemType {
   restaurantChain: string;
   servingSize: string;
}

interface FoodItemType extends MenuItemType {}

interface IngredientType {
   aisle: string;
   id: number;
   image: string;
   name: string;
   nutrition: IngredientNutrition;
   possibleUnits: string[];
   amount: number;
   unit: string;
}

type IngredientNutrition = {
   caloricBreakdown: {
      percentCarbs: number;
      percentFat: number;
      percentProtein: number;
   };
   weightPerServing: { amoun: number; unit: string };
   nutrients: SingleNutrient[];
};

type SingleNutrient = {
   name: string;
   amount: number;
   percentOfDailyNeeds: number;
   unit: string;
};

type CurrentGoals = {
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

type Session = {
   user_id: string;
   passport: { user: string };
   username: string;
};

type Query = {
   query: string;
   type: string;
   intolerance?: string | undefined;
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

type SampleMealplanItem = {
   id: number;
   imageTtype: string;
   readyInMinutes: number;
   servings: number;
   sourceUrl: string;
   title: string;
};

type MealplanItemType = {
   id: number;
   position: number;
   slot: number;
   type: string;
   value: {
      id: number;
      imageType: string;
      servings: number;
      title: string;
      amount: number | undefined;
      image: string | undefined;
      name: string;
      unit: string | undefined;
   };
};

type UserType = {
   username: string;
   email: string;
   password: string;
};

type AccountType = {
   status: string;
   username: string;
   spoonacularPassword: string;
   hash: string;
};

type AddToMealPlanType = {
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

type Ingredient = {
   name: string;
   unit: string;
   amount: string;
   image: string;
};

type AddIngredientsToMealPlan = {
   date?: number | undefined;
   slot?: number | undefined;
   position?: number | undefined;
   type?: string | undefined;
   value?: {
      ingredients: Ingredient[];
   };
};

type RecipeQuery = {
   offset: string;
   number: string;
   query: string;
};

type User = {
   username: string;
   email: string;
   spoonacular_username: string;
   spoonacular_password: string;
   spoonacular_hash: string;
   hash: string;
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

type ShoppingListBody = {
   currentDay: string;
};

export {
   MenuItemNutrition,
   RecipeItemNutrition,
   ValuesType,
   Recipe,
   GroceryItemNutrition,
   GroceryItemType,
   RecipeItemType,
   MenuItemType,
   FoodItemType,
   CurrentGoals,
   Session,
   Query,
   SampleMealplanItem,
   MealplanItemType,
   UserType,
   AccountType,
   AddToMealPlanType,
   User,
   Intolerances,
   SelectedDate,
   RequestParams,
   RecipeQuery,
   AddIngredientsToMealPlan,
   IngredientType,
   ShoppingListBody,
};
