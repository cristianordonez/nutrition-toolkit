import React, { FormEventHandler } from 'react';
import { Button, Typography, Stack, SelectChangeEvent } from '@mui/material';
import { NutrientInputForm } from './search-form-components/NutrientInputForm';
import { SearchInput } from './search-form-components/SearchInput';
import { QueryTextField } from './search-form-components/QueryTextField';
import { TypeDropDown } from './search-form-components/TypeDropDown';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { ValuesType } from '../../../../types/types';
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
               {route === 'recipes' ? (
                  <TypeDropDown
                     type={values.type}
                     handleTypeSelect={handleTypeSelect}
                  />
               ) : null}
               {/* CALORIES */}
               {route !== 'ingredients' ? (
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
               ) : (
                  <Typography sx={{ pt: '1rem' }} variant='subtitle1'>
                     All ranges must be between 0 and 100%
                  </Typography>
               )}

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
