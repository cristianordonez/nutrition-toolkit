import React from 'react';
import { TextField } from '@mui/material';

interface Props {
   error: boolean;
   showSignup: boolean;
   handleCreateAccountChange?(event: React.SyntheticEvent): any;
   handleLoginChange?(event: React.SyntheticEvent): any;
   errorMessage: string;
}

export const PasswordTextField = ({
   error,
   showSignup,
   handleCreateAccountChange,
   handleLoginChange,
   errorMessage,
}: Props) => {
   return (
      <TextField
         required
         data-testid='password-textfield'
         error={error}
         onChange={showSignup ? handleCreateAccountChange : handleLoginChange}
         label='Password'
         type='password'
         name='password'
         variant='filled'
         fullWidth
         helperText={error ? errorMessage : 'Enter your password'}
      />
   );
};
