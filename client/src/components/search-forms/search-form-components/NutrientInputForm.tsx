import React, { useState } from 'react';
import {
   FormControl,
   Input,
   FormHelperText,
   Typography,
   InputAdornment,
   Stack,
} from '@mui/material';

interface Props {
   handleInputChange: any;
   measurement: string;
   nutrient: 'Calories' | 'Carbs' | 'Protein' | 'Fat';
   minValue: string | number | null;
   maxValue: string | number | null;
   route: string;
}
export const NutrientInputForm = ({
   handleInputChange,
   measurement,
   nutrient,
   minValue,
   maxValue,
   route,
}: Props) => {
   let currentNutrient;
   if (nutrient === 'Carbs') {
      currentNutrient = 'Carbohydrate';
   } else if (nutrient === 'Calories') {
      currentNutrient = 'Calorie';
   } else {
      currentNutrient = nutrient;
   }

   let currentMeasurement = route === 'ingredients' ? '%' : measurement;
   let minError;
   let maxError;
   if (route === 'ingredients' && minValue && minValue < 0) {
      minError = true;
   } else {
      minError = false;
   }
   if (route === 'ingredients' && maxValue && maxValue > 100) {
      maxError = true;
   } else {
      maxError = false;
   }

   return (
      <>
         {route === 'ingredients' ? (
            <Typography variant='h6'>
               Choose {currentNutrient} Range (percentage)
            </Typography>
         ) : (
            <Typography variant='h6'>Choose {currentNutrient} Range</Typography>
         )}
         <Stack direction='row'>
            <FormControl fullWidth variant='standard' sx={{ m: 1, mt: 3 }}>
               <Input
                  id={`min${nutrient}`}
                  type='number'
                  required
                  data-testid='textfield-min-nutrient'
                  value={minValue}
                  error={minError}
                  onChange={handleInputChange}
                  endAdornment={
                     <InputAdornment position='end'>
                        {currentMeasurement}
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
                  error={maxError}
                  value={maxValue}
                  onChange={handleInputChange}
                  endAdornment={
                     <InputAdornment position='end'>
                        {currentMeasurement}
                     </InputAdornment>
                  }
                  inputProps={{
                     'aria-label': `Maximum ${nutrient}`,
                  }}
               />
               <FormHelperText>{`Maximum ${nutrient}`}</FormHelperText>
            </FormControl>
         </Stack>
      </>
   );
};
