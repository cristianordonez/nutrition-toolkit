export type RecipeItemType = {
   id: number;
   image: string;
   imageType: string;
   nutrition: RecipeItemNutrition;
   title: string;
   sourceUrl: string;
   spoonacularSourceUrl: string;
   servings: number;
}

export type RecipeItemNutrition = {
    nutrients: [];
}

export type GroceryItemType = {
   id: number;
   aisle: string;
   importantBadges: string[];
   brand: string;
   description: string;
   image: string;
   imageType: string;
   title: string;
   nutrition: GroceryItemNutrition;
   price: number;
   ingredientList: string;
}

export type GroceryItemNutrition = {
      calories: number;
      carbs: string;
      fat: string;
      protein: string;
}

export type MenuItemType = {
   id: number;
   image: string;
   imageType: string;
   title: string;
   nutrition: MenuItemNutrition;
   restaurantChain: string;
   servingSize: string;
}

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