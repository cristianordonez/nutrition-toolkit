import { TextField } from '@mui/material';
import React from 'react';

interface Props {
   showSignup: boolean;
   handleCreateAccountChange?: (
      event: React.ChangeEvent<HTMLInputElement>
   ) => void;
   handleLoginChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UsernameTextField = ({
   showSignup,
   handleCreateAccountChange,
   handleLoginChange,
}: Props) => {
   return (
      <TextField
         inputProps={{ 'data-testid': 'username-textfield' }}
         required
         onChange={showSignup ? handleCreateAccountChange : handleLoginChange}
         label={showSignup ? 'Username' : 'Email'}
         type='text'
         variant='filled'
         name='username'
         placeholder={showSignup ? 'Username' : 'Email'}
         fullWidth
         id='username'
         helperText={showSignup ? 'Enter your username' : 'Enter your email'}
      />
   );
};
