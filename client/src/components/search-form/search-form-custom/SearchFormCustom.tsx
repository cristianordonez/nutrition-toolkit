import React from 'react';

import { Button, Typography, Stack } from '@mui/material';
import { NutrientInputForm } from '../helper-components/NutrientInputForm';
import { SearchInput } from '../helper-components/SearchInput';
import { QueryTextField } from '../helper-components/QueryTextField';
import { TypeDropDown } from '../helper-components/TypeDropDown';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface Props {
   route: any;
   values: any;
   handleSubmit: any;
   handleRouteChange: any;
   handleInputChange: any;
   handleTypeSelect: any;
}

const SearchFormCustom = ({
   route,
   values,
   handleSubmit,
   handleRouteChange,
   handleInputChange,
   handleTypeSelect,
}: Props): ReactJSXElement => {
   // const handleRouteChange = (event: SelectChangeEvent) => {
   //    setRoute(event.target.value);
   // };

   // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   //    setValues({ ...values, [event.target.id]: event.target.value });
   // };

   // const handleTypeSelect = (event: SelectChangeEvent) => {
   //    setValues({ ...values, type: event.target.value });
   // };

   return (
      <>
         <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
               <Typography variant='body1'>
                  Search for either recipe, a grocery product, or a menu item
                  from large list of restaurants
               </Typography>
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
               <Button type='submit'>Submit</Button>
            </Stack>
         </form>
      </>
   );
};

export default SearchFormCustom;
