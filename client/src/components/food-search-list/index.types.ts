export interface RecipeItemType {
   id: number;
   image: string;
   imageType: string;
   nutrition: { nutrients: [] };
   title: string;
   sourceUrl: string;
   spoonacularSourceUrl: string;
   servings: number;
}
export interface GroceryItemType {
   id: number;
   aisle: string;
   importantBadges: string[];
   brand: string;
   description: string;
   image: string;
   imageType: string;
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

export interface MenuItemType {
   id: number;
   image: string;
   imageType: string;
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
