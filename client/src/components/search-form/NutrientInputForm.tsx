import React from 'react';
import {
   FormControl,
   Input,
   FormHelperText,
   InputAdornment,
   Stack,
} from '@mui/material';

interface Props {
   handleInputChange: any;
   measurement: string;
   nutrient: string;
   minValue: string | number;
   maxValue: string | number;
}
export const NutrientInputForm = ({
   handleInputChange,
   measurement,
   nutrient,
   minValue,
   maxValue,
}: Props) => {
   return (
      <>
         <Stack direction='row'>
            <FormControl fullWidth variant='standard' sx={{ m: 1, mt: 3 }}>
               <Input
                  id={`min${nutrient}`}
                  type='number'
                  required
                  value={minValue}
                  onChange={handleInputChange}
                  endAdornment={
                     <InputAdornment position='end'>
                        {measurement}
                     </InputAdornment>
                  }
                  inputProps={{
                     'aria-label': `Minimum ${nutrient}`,
                  }}
               />
               <FormHelperText>{`Minimum ${nutrient}`}</FormHelperText>
            </FormControl>
            <FormControl fullWidth variant='standard' sx={{ m: 1, mt: 3 }}>
               <Input
                  id={`max${nutrient}`}
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
      </>
   );
};
