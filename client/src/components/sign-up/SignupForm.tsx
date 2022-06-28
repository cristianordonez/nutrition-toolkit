import React, { useEffect } from 'react';
import './SignupForm.scss';
import { Typography, Paper, Button } from '@mui/material';
import { MacroCalculatorForm } from '../macro-calculator/MacroCalculatorForm';

export const SignupForm = ({
   usernameTextField,
   emailTextField,
   passwordTextField,
   confirmPasswordTextField,
   handleRedirectToSignup,
   setError,
   handleInitialSignupForm,
   showNextPage,
}: any) => {
   //handles turning off errors on textfield if user redirects here after submitting wrong credentials
   useEffect(() => {
      setError(false);
   }, []);

   //after user is created, navigate to the next page with successful response
   return (
      <>
         {showNextPage ? (
            <MacroCalculatorForm />
         ) : (
            <Paper
               onSubmit={handleInitialSignupForm}
               component={'form'}
               className='signup-form'
            >
               <Typography variant='h6'>Create an account</Typography>
               <Typography variant='subtitle1'>
                  Please enter your details
               </Typography>
               {usernameTextField}
               {emailTextField}
               {passwordTextField}
               {confirmPasswordTextField}
               <Button type='submit' fullWidth variant='contained'>
                  Create Account
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
         )}
      </>
   );
};
