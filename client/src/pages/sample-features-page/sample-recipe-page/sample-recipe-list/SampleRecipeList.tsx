import React from 'react';
import './SampleRecipeList.scss';
import { Box, Grid, Typography } from '@mui/material';
import { FoodItemType, Recipe } from '../../../../../../types/types';
import { FoodItemContents } from '../../../../components/food-item-contents/FoodItemContents';

interface Props {
   popularRecipes: Recipe[] | FoodItemType[];
   route: string;
   showPopularRecipes: boolean;
}

export const SampleRecipeList = ({
   popularRecipes,
   route,
   showPopularRecipes,
}: Props) => {
   console.log('popularRecipes:', popularRecipes);
   return (
      <>
         <Box sx={{ pt: '1rem' }}>
            {showPopularRecipes === true ? (
               <Typography align='center' variant='h4' component='h1'>
                  Popular Recipes
               </Typography>
            ) : (
               <Typography align='center' variant='h5' component='h1'>
                  Results
               </Typography>
            )}
            <div className='sample-recipes-list'>
               {showPopularRecipes
                  ? popularRecipes.map((recipe: Recipe | FoodItemType) => (
                       <FoodItemContents
                          key={recipe.id}
                          image={recipe.image}
                          url={recipe.sourceUrl}
                          title={recipe.title}
                          restaurantChain={recipe.restaurantChain}
                          route={route}
                          isMealPlanItem={true}
                       />
                    ))
                  : popularRecipes.map((recipe: FoodItemType | Recipe) => (
                       <FoodItemContents
                          key={recipe.id}
                          isMealPlanItem={true}
                          route={route}
                          url={recipe.sourceUrl}
                          title={recipe.title}
                          image={recipe.image}
                          restaurantChain={recipe.restaurantChain}
                          nutrition={recipe.nutrition}
                       />
                    ))}
            </div>
         </Box>
      </>
   );
};
