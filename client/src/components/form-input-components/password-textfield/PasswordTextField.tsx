import { TextField } from '@mui/material';
import React from 'react';

interface Props {
   showTextFieldError: boolean;
   errorMessage: string;
   showSignup: boolean;
   handleCreateAccountChange?(event: React.SyntheticEvent): void;
   handleLoginChange?(event: React.SyntheticEvent): void;
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
