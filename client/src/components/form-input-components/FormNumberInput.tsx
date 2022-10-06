// import ChangeEvent from '@mui/material/TextField';
import { FormControl, TextField } from '@mui/material';
import React, { ChangeEventHandler } from 'react';

interface Props {
   inputValue: number | string;
   handleNumberChange: ChangeEventHandler<HTMLInputElement>;
   label: string;
   id: string;
}

export const FormNumberInput = ({
   inputValue,
   handleNumberChange,
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
      </FormControl>
   );
};
