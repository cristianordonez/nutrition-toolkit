import React from 'react';
import './SignupForm.scss';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const SignupForm = ({
   usernameTextField,
   emailTextField,
   passwordTextField,
   confirmPasswordTextField,
   handleRedirectToSignup,
}: any) => {
   return (
      <>
         <Paper className='signup-form'>
            <Typography variant='h6'>Create an account</Typography>
            <Typography variant='subtitle1'>
               Please enter your details
            </Typography>
            {usernameTextField}
            {emailTextField}
            {passwordTextField}
            {confirmPasswordTextField}
            <Button fullWidth variant='contained'>
               Continue
            </Button>

            <Button variant='text' onClick={handleRedirectToSignup}>
               <Typography
                  align='center'
                  className='signup-form-text'
                  variant='caption'
               >
                  Go back
               </Typography>
            </Button>
         </Paper>
      </>
   );
};

export default SignupForm;
