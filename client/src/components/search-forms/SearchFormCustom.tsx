import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Button, SelectChangeEvent, Stack } from '@mui/material';
import React, { FormEventHandler } from 'react';
import { Query } from '../../../../types/types';
import { CategoryDropDown } from './search-form-components/CategoryDropDown';
import { NutrientInputForm } from './search-form-components/NutrientInputForm';
import { QueryTextField } from './search-form-components/QueryTextField';
interface Props {
   values: Query;
   handleSubmit: FormEventHandler<HTMLFormElement>;
   handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   handleTypeSelect: (event: SelectChangeEvent) => void;
}

export const SearchFormCustom = ({
   values,
   handleSubmit,
   handleInputChange,
   handleTypeSelect,
}: Props): ReactJSXElement => {
   return (
      <>
         <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
               <QueryTextField
                  query={values.query}
                  handleInputChange={handleInputChange}
               />
               <CategoryDropDown
                  type={values.category}
                  handleTypeSelect={handleTypeSelect}
               />
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'kcal'}
                  nutrient={'Calories'}
                  minValue={values.minCalories}
                  maxValue={values.maxCalories}
               />
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'g'}
                  nutrient={'Carbs'}
                  minValue={values.minCarbs}
                  maxValue={values.maxCarbs}
               />
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'g'}
                  nutrient={'Protein'}
                  minValue={values.minProtein}
                  maxValue={values.maxProtein}
               />
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
