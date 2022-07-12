export type UserType = {
   username: string;
   email: string;
   password: string;
}

export type AccountType = {
   status: string;
   username: string;
   spoonacularPassword: string;
   hash: string;
}

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
}

export type MealPlanType = {
   date: number;
   slot: number;
   position: number;
   type: string;
   value: {
      id: number;
      servings: number;
      title: string;
      imageType: string;
   };
}
