export interface RecipeItem {
   id: number;
   image: string;
   nutrition: { nutrients: [] };
   title: string;
   sourceUrl: string;
   spoonacularSourceUrl: string;
   servings: number;
}
export interface GroceryItem {
   id: number;
   aisle: string;
   importantBadges: string[];
   brand: string;
   description: string;
   image: string;
   title: string;
   nutrition: {
      calories: number;
      carbs: string;
      fat: string;
      protein: string;
   };
   price: number;
   ingredientList: string;
}

export interface MenuItem {
   id: number;
   image: string;
   title: string;
   nutrition: {
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
   restaurantChain: string;
   servingSize: string;
}
