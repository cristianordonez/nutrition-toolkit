import React from 'react';
import { Button, Typography, Stack } from '@mui/material';
import { NutrientInputForm } from '../../pages/search-page/search-form/NutrientInputForm';
import { SearchInput } from '../../pages/search-page/search-form/SearchInput';
import { QueryTextField } from '../../pages/search-page/search-form/QueryTextField';
import { TypeDropDown } from '../../pages/search-page/search-form/TypeDropDown';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface Props {
   route: any;
   values: any;
   handleRouteChange: any;
   handleInputChange: any;
   handleTypeSelect: any;
   goals: any;
   handleSuggestedSubmit: any;
}

export const SearchFormSuggested = ({
   route,
   values,
   handleRouteChange,
   handleInputChange,
   handleTypeSelect,
   goals,
   handleSuggestedSubmit,
}: Props): ReactJSXElement => {
   return (
      <>
         <form onSubmit={handleSuggestedSubmit}>
            <Stack spacing={3}>
               {/* ROUTES */}
               <Typography variant='subtitle2'>
                  {' '}
                  Suggested goals are calculated based on recommend amounts per
                  meal, considering 3 meals are had per day.
               </Typography>

               <SearchInput
                  route={route}
                  handleRouteChange={handleRouteChange}
               />
               {/* QUERY */}

               <QueryTextField
                  query={values.query}
                  handleInputChange={handleInputChange}
               />
               {/* TYPE */}

               <TypeDropDown
                  type={values.type}
                  handleTypeSelect={handleTypeSelect}
               />
               {/* CALORIES */}
               <Typography variant='h6'>Choose Calorie Range</Typography>
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'kcal'}
                  nutrient={'Calories'}
                  minValue={goals.min_calories_per_meal}
                  maxValue={goals.max_calories_per_meal}
               />
               {/* CARBS */}
               <Typography variant='h6'>Choose Carb Range</Typography>
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'g'}
                  nutrient={'Carbs'}
                  minValue={goals.min_carbs_per_meal}
                  maxValue={goals.max_carbs_per_meal}
               />

               {/* PROTEIN */}
               <Typography variant='h6'>Choose Protein Range</Typography>
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'g'}
                  nutrient={'Protein'}
                  minValue={goals.min_protein_per_meal}
                  maxValue={goals.max_protein_per_meal}
               />
               {/* FAT */}
               <Typography variant='h6'>Choose Fat Range</Typography>
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'g'}
                  nutrient={'Fat'}
                  minValue={goals.min_fat_per_meal}
                  maxValue={goals.max_fat_per_meal}
               />
               <Button type='submit' variant='contained'>
                  Submit
               </Button>
            </Stack>
         </form>
      </>
   );
};
