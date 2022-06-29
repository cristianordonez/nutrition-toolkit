import React from 'react';
import {
   FormControl,
   Input,
   FormHelperText,
   InputAdornment,
} from '@mui/material';

interface Props {
   value: number;
   id: string;
   handleInputChange: any;
   measurement: string;
   formHelperText: string;
}
export const NutrientInputForm = ({
   value,
   id,
   handleInputChange,
   measurement,
   formHelperText,
}: Props) => {
   return (
      <FormControl fullWidth variant='standard' sx={{ m: 1, mt: 3 }}>
         <Input
            id={id}
            type='number'
            required
            value={value}
            onChange={handleInputChange}
            endAdornment={
               <InputAdornment position='end'>{measurement}</InputAdornment>
            }
            inputProps={{
               'aria-label': 'minimum calories',
            }}
         />
         <FormHelperText>{formHelperText}</FormHelperText>
      </FormControl>
   );
};
