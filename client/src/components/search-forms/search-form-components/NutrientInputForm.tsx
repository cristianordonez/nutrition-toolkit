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
   let currentGoal;

   if (nutrient === 'Carbs') {
      currentGoal = goals.total_carbohydrates;
      currentNutrient = 'Carbohydrate';
   } else if (nutrient === 'Calories') {
      currentGoal = goals.total_calories;
      currentNutrient = 'Calorie';
   } else if (nutrient === 'Fat') {
      currentGoal = goals.total_fat;
      currentNutrient = nutrient;
   } else if (nutrient === 'Protein') {
      currentGoal = goals.total_protein;
      currentNutrient = nutrient;
   }

   return (
      <>
         <Stack direction='column'>
            <Typography variant='h6'>Choose {currentNutrient} Range</Typography>
            <Typography color='textSecondary' variant='subtitle2'>
               Daily Goal: {currentGoal} {measurement}
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
