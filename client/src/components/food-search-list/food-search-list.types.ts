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
}

export type RecipeItemNutrition = {
   nutrients: [];
}
export type GroceryItemNutrition = {
      calories: number;
      carbs: string;
      fat: string;
      protein: string;
}

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

export interface FoodItemType extends MenuItemType {

};
