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
         required
         onChange={showSignup ? handleCreateAccountChange : handleLoginChange}
         label='Username'
         type='text'
         variant='filled'
         name='username'
         fullWidth
         helperText={'Enter your username'}
      />
   );
};
