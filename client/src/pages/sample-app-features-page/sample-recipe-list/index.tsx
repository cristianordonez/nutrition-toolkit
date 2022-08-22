import React from 'react';
import { SampleRecipeCard } from './sample-recipe-card/SampleRecipeCard';
import { Grid } from '@mui/material';

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
   return (
      <>
         <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
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
               />
            ))}
         </Grid>
      </>
   );
};
