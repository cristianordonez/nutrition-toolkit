import { TextField } from '@mui/material';
import React from 'react';

interface Props {
   showSignup: boolean;
   handleCreateAccountChange?: (
      event: React.ChangeEvent<HTMLInputElement>
   ) => void;
   handleLoginChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
   name: string;
   value: string;
   label: string;
   type: string;
   placeholder: string;
   errorMessage: string;
   helperText: string;
   showTextFieldError: boolean | undefined;
}

export const CustomTextField = ({
   showSignup,
   errorMessage,
   handleCreateAccountChange,
   handleLoginChange,
   name,
   label,
   value,
   type,
   helperText,
   placeholder,
   showTextFieldError,
}: Props) => {
   return (
      <TextField
         inputProps={{ 'data-testid': 'username-textfield' }}
         required
         error={showTextFieldError}
         onChange={showSignup ? handleCreateAccountChange : handleLoginChange}
         label={label}
         type={type}
         variant='filled'
         name={name}
         placeholder={placeholder}
         fullWidth
         helperText={showTextFieldError ? errorMessage : helperText}
         value={value}
      />
   );
};
