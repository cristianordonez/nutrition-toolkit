import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Button, SelectChangeEvent, Stack } from '@mui/material';
import React, { FormEventHandler } from 'react';
import { ValuesType } from '../../../../types/types';
import { CategoryDropDown } from './search-form-components/CategoryDropDown';
import { NutrientInputForm } from './search-form-components/NutrientInputForm';
import { QueryTextField } from './search-form-components/QueryTextField';
interface Props {
   route: string;
   values: ValuesType;
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
               {/* <SearchInput
                  route={route}
                  handleRouteChange={handleRouteChange}
               /> */}
               {/* QUERY */}
               <QueryTextField
                  query={values.query}
                  handleInputChange={handleInputChange}
               />
               {/* TYPE */}

               <CategoryDropDown
                  type={values.category}
                  handleTypeSelect={handleTypeSelect}
               />

               {/* CALORIES */}

               <>
                  <NutrientInputForm
                     handleInputChange={handleInputChange}
                     measurement={'kcal'}
                     nutrient={'Calories'}
                     minValue={values.minCalories}
                     maxValue={values.maxCalories}
                     route={route}
                  />
               </>

               {/* CARBS */}
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'g'}
                  nutrient={'Carbs'}
                  minValue={values.minCarbs}
                  maxValue={values.maxCarbs}
                  route={route}
               />
               {/* PROTEIN */}
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'g'}
                  nutrient={'Protein'}
                  minValue={values.minProtein}
                  maxValue={values.maxProtein}
                  route={route}
               />
               {/* FAT */}
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'g'}
                  nutrient={'Fat'}
                  minValue={values.minFat}
                  maxValue={values.maxFat}
                  route={route}
               />
               <Button type='submit' variant='contained'>
                  Submit
               </Button>
            </Stack>
         </form>
      </>
   );
};
