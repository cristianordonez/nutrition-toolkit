import React from 'react';
import './LoginForm.scss';
import LoginImage from '../../../img/healthy-eating.svg';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export const LoginForm = ({
   handleRedirectToSignup,
   usernameTextField,
   emailTextField,
   passwordTextField,
   handleLogin,
}: any) => {
   return (
      <>
         <Grid container>
            <Grid item xs={0} md={6}>
               <img src={LoginImage} />
            </Grid>
            <Grid item xs={12} md={6}>
               <Paper
                  component={'form'}
                  onSubmit={handleLogin}
                  className='login-form'
               >
                  <Typography variant='h6'>Welcome Back...</Typography>
                  <Typography variant='subtitle1'>
                     Please enter your details
                  </Typography>
                  {usernameTextField}
                  {/* {emailTextField} */}
                  {passwordTextField}
                  <Button type='submit' fullWidth variant='contained'>
                     Log In
                  </Button>
                  <Stack direction='row'>
                     <Typography
                        className='login-form-account-text'
                        variant='caption'
                     >
                        Don't have an account yet?{' '}
                     </Typography>
                     <Button variant='text' onClick={handleRedirectToSignup}>
                        <Typography
                           align='center'
                           className='login-form-text'
                           variant='caption'
                        >
                           Create Account
                        </Typography>
                     </Button>
                  </Stack>
               </Paper>
            </Grid>
         </Grid>
      </>
   );
};
