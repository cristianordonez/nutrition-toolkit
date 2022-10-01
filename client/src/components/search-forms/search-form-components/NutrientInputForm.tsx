import {
   FormControl,
   FormHelperText,
   Input,
   InputAdornment,
   Stack,
   Typography,
} from '@mui/material';
import React from 'react';
import { CurrentGoals } from '../../../../../types/types';

interface Props {
   handleInputChange: any;
   measurement: string;
   nutrient: 'Calories' | 'Carbs' | 'Protein' | 'Fat';
   minValue: string | number | null;
   maxValue: string | number | null;
   goals: CurrentGoals;
}
export const NutrientInputForm = ({
   handleInputChange,
   measurement,
   nutrient,
   minValue,
   maxValue,
   goals,
}: Props) => {
   let currentNutrient;
   let minGoal;
   let maxGoal;

   if (nutrient === 'Carbs') {
      minGoal = goals.min_carbohydrates_per_meal;
      maxGoal = goals.max_carbohydrates_per_meal;
      currentNutrient = 'Carbohydrate';
   } else if (nutrient === 'Calories') {
      minGoal = goals.min_calories_per_meal;
      maxGoal = goals.max_calories_per_meal;
      currentNutrient = 'Calorie';
   } else if (nutrient === 'Fat') {
      minGoal = goals.min_fat_per_meal;
      maxGoal = goals.max_fat_per_meal;
      currentNutrient = nutrient;
   } else if (nutrient === 'Protein') {
      minGoal = goals.min_protein_per_meal;
      maxGoal = goals.max_protein_per_meal;
      currentNutrient = nutrient;
   }

   return (
      <>
         <Stack direction='column'>
            <Typography variant='h6'>Choose {currentNutrient} Range</Typography>
            <Typography color='textSecondary' variant='subtitle2'>
               Goal: {minGoal} - {maxGoal} {measurement} per meal
            </Typography>
            <Stack direction='row'>
               <FormControl fullWidth variant='standard' sx={{ m: 1, mt: 3 }}>
                  <Input
                     id={`min${nutrient}`}
                     type='number'
                     required
                     data-testid='textfield-min-nutrient'
                     value={minValue}
                     onChange={handleInputChange}
                     endAdornment={
                        <InputAdornment position='end'>
                           {measurement}
                        </InputAdornment>
                     }
                     inputProps={{
                        'aria-label': `Minimum ${nutrient}`,
                        'helper-text': 'test',
                     }}
                  />
                  <FormHelperText>{`Minimum ${nutrient}`}</FormHelperText>
               </FormControl>
               <FormControl fullWidth variant='standard' sx={{ m: 1, mt: 3 }}>
                  <Input
                     id={`max${nutrient}`}
                     data-testid='textfield-max-nutrient'
                     type='number'
                     required
                     value={maxValue}
                     onChange={handleInputChange}
                     endAdornment={
                        <InputAdornment position='end'>
                           {measurement}
                        </InputAdornment>
                     }
                     inputProps={{
                        'aria-label': `Maximum ${nutrient}`,
                     }}
                  />
                  <FormHelperText>{`Maximum ${nutrient}`}</FormHelperText>
               </FormControl>
            </Stack>
         </Stack>
      </>
   );
};
