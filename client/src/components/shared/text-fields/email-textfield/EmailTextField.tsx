import React from 'react';
import { TextField } from '@mui/material';

interface Props {
   handleCreateAccountChange(event: React.SyntheticEvent): any;
}

export const EmailTextField = ({ handleCreateAccountChange }: Props) => {
   return (
      <TextField
         required
         onChange={handleCreateAccountChange}
         data-testid='email-textfield'
         label='Email'
         placeholder='Email'
         type='email'
         name='email'
         variant='filled'
         fullWidth
         helperText={'Enter your email'}
      />
   );
};
