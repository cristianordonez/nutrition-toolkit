import React from 'react';
import FoodSearchItem from './food-search-item/FoodSearchItem';
import Grid from '@mui/material/Grid';

type RecipeNutrients = {
   nutrients: [];
};

type RecipeItem = {
   id: number;
   image: string;
   nutrition: RecipeNutrients;
   title: string;
   sourceUrl: string;
   spoonacularSourceUrl: string;
   servings: number;
};

type GroceryNutrients = {
   calories: number;
   carbs: string;
   fat: string;
   protein: string;
};

type GroceryItem = {
   id: number;
   aisle: string;
   importantBadges: string[];
   brand: string;
   description: string;
   image: string;
   title: string;
   nutrition: GroceryNutrients;
   price: number;
   ingredientList: string;
};

type MenuItem = {
   id: number;
   image: string;
   title: string;
   nutrition: MenuItemNutrients;
   restaurantChain: string;
   servingSize: string;
};

type MenuItemNutrients = {
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

const FoodSearchList = ({ apiData, route }: any) => {
   console.log('apiData:', apiData);

   return (
      <>
         <Grid container spacing={2}>
            {route === 'recipes' &&
               apiData.map((item: RecipeItem) => (
                  <FoodSearchItem
                     key={item.id}
                     image={item.image}
                     title={item.title}
                     nutrition={item.nutrition}
                     route={route}
                     url={item.spoonacularSourceUrl}
                  />
               ))}
            {route === 'groceryProducts' &&
               apiData.map((item: GroceryItem) => (
                  <FoodSearchItem
                     key={item.id}
                     description={item.description}
                     image={item.image}
                     title={item.title}
                     nutrition={item.nutrition}
                     price={item.price}
                     ingredientList={item.ingredientList}
                     route={route}
                  />
               ))}
            {route === 'menuItems' &&
               apiData.map((item: MenuItem) => (
                  <FoodSearchItem
                     key={item.id}
                     image={item.image}
                     title={item.title}
                     nutrition={item.nutrition}
                     route={route}
                     restaurantChain={item.restaurantChain}
                  />
               ))}
         </Grid>
      </>
   );
};

export default FoodSearchList;
