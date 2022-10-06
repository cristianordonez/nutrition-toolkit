import React from 'react';
import { TextField } from '@mui/material';

interface Props {
   showTextFieldError: boolean;
   errorMessage: string;
   showSignup: boolean;
   handleCreateAccountChange?(event: React.SyntheticEvent): any;
   handleLoginChange?(event: React.SyntheticEvent): any;
}

export const PasswordTextField = ({
   showTextFieldError,
   errorMessage,
   showSignup,
   handleCreateAccountChange,
   handleLoginChange,
}: Props) => {
   return (
      <TextField
         required
         error={showTextFieldError}
         onChange={showSignup ? handleCreateAccountChange : handleLoginChange}
         label='Password'
         placeholder='Password'
         type='password'
         name='password'
         variant='filled'
         fullWidth
         helperText={showTextFieldError ? errorMessage : 'Enter your password'}
      />
   );
};
