import React, { FormEventHandler } from 'react';

import { Button, Typography, Stack, SelectChangeEvent } from '@mui/material';
import { NutrientInputForm } from '../../pages/search-page/search-form/NutrientInputForm';
import { SearchInput } from '../../pages/search-page/search-form/SearchInput';
import { QueryTextField } from '../../pages/search-page/search-form/QueryTextField';
import { TypeDropDown } from '../../pages/search-page/search-form/TypeDropDown';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface Props {
   route: string;
   values: {
      query: string;
      type: string;
      minCalories: string;
      maxCalories: string;
      minProtein: string;
      maxProtein: string;
      minCarbs: string;
      maxCarbs: string;
      minFat: string;
      maxFat: string;
   };
   handleSubmit: FormEventHandler<HTMLFormElement>;
   handleRouteChange: (event: SelectChangeEvent) => void;
   handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   handleTypeSelect: (event: SelectChangeEvent) => void;
}

export const SearchFormCustom = ({
   route,
   values,
   handleSubmit,
   handleRouteChange,
   handleInputChange,
   handleTypeSelect,
}: Props): ReactJSXElement => {
   return (
      <>
         <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
               {/* ROUTES */}

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
                  minValue={values.minCalories}
                  maxValue={values.maxCalories}
               />
               {/* CARBS */}
               <Typography variant='h6'>Choose Carb Range</Typography>
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'g'}
                  nutrient={'Carbs'}
                  minValue={values.minCarbs}
                  maxValue={values.maxCarbs}
               />

               {/* PROTEIN */}
               <Typography variant='h6'>Choose Protein Range</Typography>
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'g'}
                  nutrient={'Protein'}
                  minValue={values.minProtein}
                  maxValue={values.maxProtein}
               />
               {/* FAT */}
               <Typography variant='h6'>Choose Fat Range</Typography>
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'g'}
                  nutrient={'Fat'}
                  minValue={values.minFat}
                  maxValue={values.maxFat}
               />
               <Button type='submit' variant='contained'>
                  Submit
               </Button>
            </Stack>
         </form>
      </>
   );
};
