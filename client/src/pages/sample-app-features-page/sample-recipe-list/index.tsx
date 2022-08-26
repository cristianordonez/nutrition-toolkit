import React from 'react';
import './index.scss';
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
   restaurantChain?: string | undefined;
}

interface Props {
   popularRecipes: Recipe[];
   route: string;
}

export const SampleRecipeList = ({ popularRecipes, route }: Props) => {
   return (
      <>
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
                  diets={recipe.diets}
                  restaurantChain={recipe.restaurantChain}
                  route={route}
               />
            ))}
         </Grid>
      </>
   );
};
