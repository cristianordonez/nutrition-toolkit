import React, { useState } from 'react';
import './index.scss';
import { SampleRecipeCard } from './sample-recipe-card/SampleRecipeCard';
import { SampleRecipeSideBar } from './sample-recipe-sidebar/SampleRecipeSidebar';
import { Grid, Toolbar, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Recipe {
   aggregateLikes: number;
   id: number;
   image: string;
   servings: number;
   title: string;
   sourceUrl: string;
   spoonacularSourceUrl: string;
   summary: string; //provides unnecessary information
   readyInMinutes: number;
   vegetarian: boolean;
   dishTypes: string[];
   vegan: boolean;
   cheap: boolean;
   instructions: string;
   sustainable: boolean;
   dairyFree: boolean;
   veryHealthy: boolean;
   veryPopular: boolean;
   lowFodmap: boolean;
   diets: string[];
}

interface Props {
   popularRecipes: Recipe[];
}

export const SampleRecipeList = ({ popularRecipes }: Props) => {
   // popularRecipes = popularRecipes.slice(0, 8);
   const [mobileOpen, setMobileOpen] = React.useState(false);

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };
   return (
      <>
         <Toolbar sx={{ display: { sm: 'none' } }}>
            <IconButton
               color='inherit'
               aria-label='open drawer'
               edge='start'
               onClick={handleDrawerToggle}
               sx={{ mr: 2, display: { sm: 'none' } }}
            >
               <ArrowForwardIosIcon />
            </IconButton>
         </Toolbar>
         <SampleRecipeSideBar
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
         />
         <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 4, md: 12 }}
            className='recipe-search-list'
         >
            {popularRecipes.map((recipe: Recipe) => (
               <SampleRecipeCard
                  key={recipe.id}
                  image={recipe.image}
                  sourceUrl={recipe.sourceUrl}
                  title={recipe.title}
                  spoonacularSourceUrl={recipe.spoonacularSourceUrl}
                  servings={recipe.servings}
                  vegan={recipe.vegan}
                  vegetarian={recipe.vegetarian}
                  lowFodmap={recipe.lowFodmap}
                  dairyFree={recipe.dairyFree}
                  instructions={recipe.instructions}
                  diets={recipe.diets}
               />
            ))}
         </Grid>
      </>
   );
};
