import React from 'react';
import { TextField } from '@mui/material';

interface Props {
   showTextFieldError: boolean;
   handleCreateAccountChange(event: React.SyntheticEvent): any;
   errorMessage: string;
}

export const ConfirmPasswordTextField = ({
   showTextFieldError,
   handleCreateAccountChange,
   errorMessage,
}: Props) => {
   return (
      <TextField
         required
         data-testid='confirm-password-textfield'
         error={showTextFieldError}
         label='Confirm Password'
         placeholder='Confirm Password'
         onChange={handleCreateAccountChange}
         type='password'
         name='confirmedPassword'
         variant='filled'
         fullWidth
         helperText={showTextFieldError ? errorMessage : 'Enter your password'}
      />
   );
};
