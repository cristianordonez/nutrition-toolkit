// import ChangeEvent from '@mui/material/TextField';
import React, { ChangeEventHandler } from 'react';

import { FormControl, FormHelperText, TextField } from '@mui/material';

interface Props {
   servings?: number | string;
   handleSelectServings: ChangeEventHandler<HTMLInputElement>;
}

export const DialogServingsInput = ({
   servings,
   handleSelectServings,
}: Props) => {
   return (
      <FormControl>
         <TextField
            value={servings}
            required
            label='Servings'
            type='number'
            inputProps={{ step: '0.1', lang: 'en-US' }}
            onChange={handleSelectServings}
            fullWidth
         />
         <FormHelperText>
            Enter number of servings (up to two decimal places){' '}
         </FormHelperText>
      </FormControl>
   );
};
