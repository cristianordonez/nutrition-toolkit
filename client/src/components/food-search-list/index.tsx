import React from 'react';
import { FoodSearchItem } from './FoodSearchItem';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { RecipeItem, GroceryItem, MenuItem } from './types';

export const FoodSearchList = ({ apiData, route, handleLoadMore }: any) => {
   return (
      <>
         <Stack direction='row' spacing={1}>
            <MenuBookIcon />
            <Typography variant='h4' component='h1'>
               Results
            </Typography>
         </Stack>
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
         <Button fullWidth onClick={handleLoadMore}>
            Load More
         </Button>
      </>
   );
};
