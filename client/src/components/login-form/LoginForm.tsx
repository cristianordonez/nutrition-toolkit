import React, { useState } from 'react';
import './LoginForm.scss';
import LoginImage from '../../../img/healthy-eating.svg';
import { Grid, Stack, Paper, Button } from '@mui/material';
import { Typography } from '@mui/material';
import { PasswordTextField } from '../text-fields/PasswordTextField';
import { UsernameTextField } from '../text-fields/UsernameTextField';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

export const LoginForm = ({
   showSignup,
   handleRedirectToSignup,
   error,
   setError,
   errorMessage,
   setErrorMessage,
   handleErrorAlert,
}: any) => {
   const [loginValues, setLoginValues] = useState({
      username: '',
      password: '',
      email: '',
   });
   const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoginValues({
         ...loginValues,
         [event.target.name]: event.target.value,
      });
   };

   const navigate = useNavigate();

   const handleLogin = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      try {
         let response = await axios.post(`/api/login`, loginValues);
         if (response.status === 200) {
            setError(false);
            navigate(`/${response.data.id}/search`, { replace: true });
         }
      } catch (err: any) {
         setErrorMessage('No matching username and password found.'); //error message used in the snackbar
         setError(true); //used to show error helper text in text field
         handleErrorAlert();
         console.log('err:', err);
      }
   };

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
                  <UsernameTextField
                     showSignup={showSignup}
                     handleLoginChange={handleLoginChange}
                  />
                  <PasswordTextField
                     error={error}
                     showSignup={showSignup}
                     errorMessage={errorMessage}
                     handleLoginChange={handleLoginChange}
                  />
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
