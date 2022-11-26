import GoogleIcon from '@mui/icons-material/Google';
import { AlertColor, Button, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CustomTextField } from '../../../components/form-input-components/custom-textfield/CustomTextField';
import { MacroCalculatorContainer } from '../../../components/macro-calculator-container';
import './SignupForm.scss';

interface Props {
   showSignup: boolean;
   setShowSignup: Dispatch<SetStateAction<boolean>>;
   handleRedirectToSignup: () => void;
   showTextFieldError: boolean;
   setShowTextFieldError: Dispatch<SetStateAction<boolean>>;
   errorMessage: string;
   setErrorMessage: Dispatch<SetStateAction<string>>;
   setOpenErrorAlert: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
}

export const SignupForm = ({
   showSignup,
   setShowSignup,
   handleRedirectToSignup,
   showTextFieldError,
   setShowTextFieldError,
   errorMessage,
   setErrorMessage,
   setOpenErrorAlert,
   setAlertSeverity,
}: Props) => {
   const [showNextPage, setShowNextPage] = useState(false); //handles showing page 2 when creating account

   const [signupValues, setSignupValues] = useState({
      email: '',
      password: '',
      confirmedPassword: '',
   });

   const handleCreateAccountChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      let currentValue;
      if (event.target.name === 'email') {
         currentValue = event.target.value.toLowerCase();
      } else {
         currentValue = event.target.value;
      }
      setSignupValues({
         ...signupValues,
         [event.target.name]: currentValue,
      });
   };

   //handles turning off errors on textfield if user redirects here after submitting wrong credentials
   useEffect(() => {
      setShowTextFieldError(false);
   }, []);

   const handleInitialSignupForm = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      if (signupValues.password !== signupValues.confirmedPassword) {
         setErrorMessage('Your passwords do not match');
         setOpenErrorAlert(true);
         setShowTextFieldError(true);
      } else {
         try {
            await axios.post(`/api/signup`, signupValues);
            setAlertSeverity('success');
            setErrorMessage(
               'Your account has been created! Now enter your metrics to get customized macronutrient recommendations.'
            );
            setOpenErrorAlert(true);
            setShowNextPage(true);
         } catch (err: unknown) {
            console.log('err:', err);
            setAlertSeverity('error');
            setErrorMessage(
               'An account with that email already exists. Try logging in instead.'
            );
            setOpenErrorAlert(true);
         }
      }
   };

   //after user is created, navigate to the next page with successful response
   return (
      <div className='signup'>
         {showNextPage ? (
            <MacroCalculatorContainer
               setOpenErrorAlert={setOpenErrorAlert}
               setErrorMessage={setErrorMessage}
               setShowNextPage={setShowNextPage}
               setShowSignup={setShowSignup}
               setAlertSeverity={setAlertSeverity}
            />
         ) : (
            <Paper
               onSubmit={handleInitialSignupForm}
               component={'form'}
               className='signup-form'
               data-testid='signup-form'
            >
               <Typography variant='h6'>Create an account</Typography>
               <Button
                  variant='contained'
                  fullWidth
                  component='a'
                  color='error'
                  href='/api/login/federated/google'
               >
                  <GoogleIcon />
                  <Typography
                     variant='button'
                     align='right'
                     sx={{ marginLeft: '10px' }}
                  >
                     Sign in with Google
                  </Typography>
               </Button>
               <Typography variant='h6'>or</Typography>
               <Typography variant='subtitle1'>
                  Please enter your details
               </Typography>
               <CustomTextField
                  showSignup={true}
                  errorMessage={''}
                  handleCreateAccountChange={handleCreateAccountChange}
                  name={'email'}
                  label='Email'
                  value={signupValues.email}
                  type='email'
                  helperText='Enter your email.'
                  placeholder='Email'
                  showTextFieldError={undefined}
               />
               <CustomTextField
                  showSignup={showSignup}
                  errorMessage={errorMessage}
                  handleCreateAccountChange={handleCreateAccountChange}
                  name='password'
                  label='Password'
                  type='password'
                  helperText='Enter your password'
                  placeholder='Password'
                  value={signupValues.password}
                  showTextFieldError={showTextFieldError}
               />
               <CustomTextField
                  errorMessage={errorMessage}
                  showTextFieldError={showTextFieldError}
                  handleCreateAccountChange={handleCreateAccountChange}
                  type='password'
                  name='confirmedPassword'
                  placeholder='Confirm Password'
                  label='Confirm Password'
                  showSignup={true}
                  helperText={'Confirm your password.'}
                  value={signupValues.confirmedPassword}
               />
               <Button
                  data-testid='initial-signup-form-btn'
                  type='submit'
                  fullWidth
                  variant='contained'
               >
                  Almost done
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
      </div>
   );
};
