import {
   FormControl,
   FormHelperText,
   Input,
   InputAdornment,
   Stack,
   Typography,
} from '@mui/material';
import React from 'react';

interface Props {
   handleInputChange: any;
   measurement: string;
   nutrient: 'Calories' | 'Carbs' | 'Protein' | 'Fat';
   minValue: string | number | null;
   maxValue: string | number | null;
}
export const NutrientInputForm = ({
   handleInputChange,
   measurement,
   nutrient,
   minValue,
   maxValue,
}: Props) => {
   let currentNutrient;
   if (nutrient === 'Carbs') {
      currentNutrient = 'Carbohydrate';
   } else if (nutrient === 'Calories') {
      currentNutrient = 'Calorie';
   } else {
      currentNutrient = nutrient;
   }

   let currentMeasurement = measurement;
   let minError = false;
   let maxError = false;

   return (
      <>
         <Typography variant='h6'>Choose {currentNutrient} Range</Typography>
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
