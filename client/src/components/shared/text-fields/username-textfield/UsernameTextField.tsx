import React from 'react';
import { TextField } from '@mui/material';

interface Props {
   showSignup: boolean;
   handleCreateAccountChange?(event: React.SyntheticEvent): any;
   handleLoginChange?(event: React.SyntheticEvent): any;
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
         label={showSignup ? 'Username' : 'Username or Email'}
         type='text'
         variant='filled'
         name='username'
         placeholder={showSignup ? 'Username' : 'Username or Email'}
         fullWidth
         id='username'
         helperText={
            showSignup ? 'Enter your username' : 'Enter your username or email'
         }
      />
   );
};
