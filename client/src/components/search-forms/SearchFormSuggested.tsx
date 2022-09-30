import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { AlertColor, Button, SelectChangeEvent, Stack } from '@mui/material';
import axios from 'axios';
import React, { Dispatch, SetStateAction } from 'react';
import {
   CurrentGoals,
   MealplanItemType,
   ValuesType,
} from '../../../../types/types';
import { CategoryDropDown } from './search-form-components/CategoryDropDown';
import { NutrientInputForm } from './search-form-components/NutrientInputForm';
import { QueryTextField } from './search-form-components/QueryTextField';

interface Props {
   route: string;
   values: ValuesType;
   handleRouteChange: (event: SelectChangeEvent) => void;
   handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   handleTypeSelect: (event: SelectChangeEvent) => void;
   goals: CurrentGoals;
   setValues: Dispatch<SetStateAction<any>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setLoading: Dispatch<SetStateAction<boolean>>;
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setShowLoadMoreBtn: Dispatch<SetStateAction<boolean>>;
   setAPIData: Dispatch<SetStateAction<MealplanItemType[]>>;
}

export const SearchFormSuggested = ({
   route,
   values,
   handleRouteChange,
   handleInputChange,
   handleTypeSelect,
   goals,
   setValues,
   setAlertMessage,
   setAlertSeverity,
   setLoading,
   setOpenAlert,
   setShowLoadMoreBtn,
   setAPIData,
}: Props): ReactJSXElement => {
   //# handles submission when it comes from suggested goals form, must be different because values are coming from goals state object
   const handleSuggestedSubmit = async (event: React.SyntheticEvent) => {
      let newValues = { ...values, offset: 0 }; //declare new values so that there are no async bugs, and reset offset to 0 in case user changed it
      setValues(newValues);
      try {
         setLoading(true); //used to trigger the loading circle
         event.preventDefault();
         let suggestedValues: any = values;
         suggestedValues.minCalories = goals.min_calories_per_meal;
         suggestedValues.maxCalories = goals.max_calories_per_meal;
         suggestedValues.minCarbs = goals.min_carbs_per_meal;
         suggestedValues.maxCarbs = goals.max_carbs_per_meal;
         suggestedValues.minProtein = goals.min_protein_per_meal;
         suggestedValues.maxProtein = goals.max_protein_per_meal;
         suggestedValues.minFat = goals.min_fat_per_meal;
         suggestedValues.maxFat = goals.max_fat_per_meal;
         let foodItems = await axios.get(`/api/${route}`, {
            params: suggestedValues,
         });
         //if there are no items returned
         if (foodItems.data.length === 0) {
            setAlertMessage(
               'No options matched your search. Try again with a broader search'
            );
            setAlertSeverity('warning');
            setOpenAlert(true);
            setShowLoadMoreBtn(false);
         } else {
            setAlertSeverity('success');
            setAlertMessage('Success! Here are your matching items.');
            setOpenAlert(true);
            if (foodItems.data.length < 6) {
               setShowLoadMoreBtn(false);
            } else {
               setShowLoadMoreBtn(true);
            }
         }
         setValues(suggestedValues);
         setAPIData(foodItems.data);
         setLoading(false);
      } catch (err) {
         console.log(err);
         setLoading(false); //used to trigger the loading circle
      }
   };

   return (
      <>
         <form onSubmit={handleSuggestedSubmit}>
            <Stack spacing={3}>
               {/* <Typography variant='subtitle2'>
                  {' '}
                  Suggested goals are calculated based on recommended amounts
                  per meal, for a total of 3 meals per day.
               </Typography> */}
               {/* <SearchInput
                  route={route}
                  handleRouteChange={handleRouteChange}
               /> */}
               <QueryTextField
                  query={values.query}
                  handleInputChange={handleInputChange}
               />

               <CategoryDropDown
                  type={values.category}
                  handleTypeSelect={handleTypeSelect}
               />

               <>
                  <NutrientInputForm
                     handleInputChange={handleInputChange}
                     measurement={'kcal'}
                     nutrient={'Calories'}
                     minValue={goals.min_calories_per_meal}
                     maxValue={goals.max_calories_per_meal}
                     route={route}
                  />
               </>

               {/* CARBS */}
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'g'}
                  nutrient={'Carbs'}
                  minValue={goals.min_carbs_per_meal}
                  route={route}
                  maxValue={goals.max_carbs_per_meal}
               />
               {/* PROTEIN */}
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'g'}
                  nutrient={'Protein'}
                  minValue={goals.min_protein_per_meal}
                  route={route}
                  maxValue={goals.max_protein_per_meal}
               />
               {/* FAT */}
               <NutrientInputForm
                  handleInputChange={handleInputChange}
                  measurement={'g'}
                  nutrient={'Fat'}
                  minValue={goals.min_fat_per_meal}
                  route={route}
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
