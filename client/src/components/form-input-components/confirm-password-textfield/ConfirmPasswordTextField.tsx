import { TextField } from '@mui/material';
import React from 'react';

interface Props {
   showTextFieldError: boolean;
   handleCreateAccountChange(event: React.SyntheticEvent): void;
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
