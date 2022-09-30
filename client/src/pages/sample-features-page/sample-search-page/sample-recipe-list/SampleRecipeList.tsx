import { Box, Typography } from '@mui/material';
import React from 'react';
import './SampleRecipeList.scss';

interface Props {
   showPopularRecipes: boolean;
}

// TODO consider deleting this file since i am not showing popular recipes anymore
export const SampleRecipeList = ({ showPopularRecipes }: Props) => {
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
               {/* {showPopularRecipes
                  ? popularRecipes.map((recipe: Recipe | FoodItemType) => (
                       <FoodItemContents
                          key={recipe.id}
                          image={recipe.image}
                          id={recipe.id}
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
                          id={recipe.id}
                          url={recipe.sourceUrl}
                          title={recipe.title}
                          image={recipe.image}
                          restaurantChain={recipe.restaurantChain}
                          nutrition={recipe.nutrition}
                       />
                    ))} */}
            </div>
         </Box>
      </>
   );
};
