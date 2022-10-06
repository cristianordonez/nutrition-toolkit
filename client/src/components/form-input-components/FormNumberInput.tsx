// import ChangeEvent from '@mui/material/TextField';
import React, { ChangeEventHandler } from 'react';

import { FormControl, FormHelperText, TextField } from '@mui/material';

interface Props {
   inputValue: number | string;
   handleNumberChange: ChangeEventHandler<HTMLInputElement>;
   helperText: string;
   label: string;
   id: string;
}

export const FormNumberInput = ({
   inputValue,
   handleNumberChange,
   helperText,
   label,
   id,
}: Props) => {
   return (
      <FormControl sx={{ width: '100%' }}>
         <TextField
            value={inputValue}
            required
            id={id}
            label={label}
            type='number'
            inputProps={{ step: '0.1', lang: 'en-US' }}
            onChange={handleNumberChange}
            fullWidth
         />
         <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
   );
};
