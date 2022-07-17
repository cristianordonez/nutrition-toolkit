import React, { useState } from 'react';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import { Stack, Tabs, Tab, Typography } from '@mui/material';
import { SearchFormSuggested } from './SearchFormSuggested';
import { SearchFormCustom } from './SearchFormCustom';
import { SelectChangeEvent } from '@mui/material/Select';

type Goals = {
   total_carbohydrates: number;
   min_carbs_per_meal: number;
   max_carbs_per_meal: number;
   total_protein: number;
   min_protein_per_meal: number;
   max_protein_per_meal: number;
   total_fat: number;
   min_fat_per_meal: number;
   max_fat_per_meal: number;
   total_calories: number;
   min_calories_per_meal: number;
   max_calories_per_meal: number;
};
interface Props {
   handleSubmit: any;
   route: string;
   setRoute: any;
   setCurrentTab: any;
   currentTab: string;
   handleChange: any;
   values: any;
   setValues: any;
   goals: Goals;
   handleSuggestedSubmit: any;
}

export const SearchForm = ({
   handleSubmit,
   route,
   setRoute,
   setCurrentTab,
   currentTab,
   handleChange,
   values,
   setValues,
   goals,
   handleSuggestedSubmit,
}: Props) => {
   const handleRouteChange = (event: SelectChangeEvent) => {
      setRoute(event.target.value);
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [event.target.id]: event.target.value });
   };

   const handleTypeSelect = (event: SelectChangeEvent) => {
      setValues({ ...values, type: event.target.value });
   };
   return (
      <>
         <Stack direction='row' spacing={1}>
            <ScreenSearchDesktopIcon />
            <Typography variant='h4' component='h1'>
               Search
            </Typography>
         </Stack>
         <Tabs
            value={currentTab}
            onChange={handleChange}
            aria-label='switch between custom and suggested search'
         >
            <Tab value='custom-search' label='Custom Search' />
            <Tab value='suggested-goals' label='Suggested Goals' />
         </Tabs>

         {currentTab === 'custom-search' ? (
            <SearchFormCustom
               route={route}
               values={values}
               handleSubmit={handleSubmit}
               handleRouteChange={handleRouteChange}
               handleInputChange={handleInputChange}
               handleTypeSelect={handleTypeSelect}
            />
         ) : (
            <SearchFormSuggested
               route={route}
               values={values}
               handleRouteChange={handleRouteChange}
               handleInputChange={handleInputChange}
               handleTypeSelect={handleTypeSelect}
               goals={goals}
               handleSuggestedSubmit={handleSuggestedSubmit}
            />
         )}
      </>
   );
};
