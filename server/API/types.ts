export interface User {
   username: string;
   firstName: string;
   lastName: string;
   email: string;
   password: string;
}

export interface Account {
   status: string;
   username: string;
   spoonacularPassword: string;
   hash: string;
}

export interface Query {
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
