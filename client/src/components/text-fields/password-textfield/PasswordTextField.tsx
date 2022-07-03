import React from 'react';
import { TextField } from '@mui/material';

interface Props {
   error: boolean;
   errorMessage: string;
   showSignup: boolean;
   handleCreateAccountChange?(event: React.SyntheticEvent): any;
   handleLoginChange?(event: React.SyntheticEvent): any;
}

export const PasswordTextField = ({
   error,
   errorMessage,
   showSignup,
   handleCreateAccountChange,
   handleLoginChange,
}: Props) => {
   return (
      <TextField
         required
         error={error}
         onChange={showSignup ? handleCreateAccountChange : handleLoginChange}
         label='Password'
         placeholder='Password'
         type='password'
         name='password'
         variant='filled'
         fullWidth
         helperText={error ? errorMessage : 'Enter your password'}
      />
   );
};
