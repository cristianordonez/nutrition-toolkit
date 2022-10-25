import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Button, Stack } from '@mui/material';
import React, { FormEventHandler, MouseEventHandler } from 'react';
import { CurrentGoals, Query } from '../../../../types/types';
import { NutrientInputForm } from '../form-input-components/NutrientInputForm';
import { QueryTextField } from '../form-input-components/QueryTextField';
import { RadioAllergyGroup } from '../form-input-components/radio-group/RadioAllergyGroup';

interface Props {
   values: Query;
   handleSubmit: FormEventHandler<HTMLFormElement>;
   handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   goals: CurrentGoals;
   handleRadioClick: MouseEventHandler<HTMLButtonElement>;
}

export const AdvancedSearchForm = ({
   values,
   handleSubmit,
   handleInputChange,
   goals,
   handleRadioClick,
}: Props): ReactJSXElement => {
   return (
      <>
         <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
               <QueryTextField
                  query={values.query}
                  id={'query'}
                  handleInputChange={handleInputChange}
                  helperText={'Search by food'}
               />

               <RadioAllergyGroup
                  allergy={values.allergy}
                  handleRadioClick={handleRadioClick}
               />
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'kcal'}
                  nutrient={'Calories'}
                  goals={goals}
                  minValue={values.minCalories}
                  maxValue={values.maxCalories}
               />
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'g'}
                  nutrient={'Carbs'}
                  goals={goals}
                  minValue={values.minCarbs}
                  maxValue={values.maxCarbs}
               />
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'g'}
                  nutrient={'Protein'}
                  goals={goals}
                  minValue={values.minProtein}
                  maxValue={values.maxProtein}
               />
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'g'}
                  nutrient={'Fat'}
                  goals={goals}
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
