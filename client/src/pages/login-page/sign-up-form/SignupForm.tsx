import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './SignupForm.scss';
import { Typography, Paper, Button, AlertColor } from '@mui/material';
import { MacroCalculatorForm } from '../../../components/macro-calculator-form';
import { ConfirmPasswordTextField } from '../../../components/text-fields/confirm-password-textfield/ConfirmPasswordTextField';
import { EmailTextField } from '../../../components/text-fields/email-textfield/EmailTextField';
import { PasswordTextField } from '../../../components/text-fields/password-textfield/PasswordTextField';
import { UsernameTextField } from '../../../components/text-fields/username-textfield/UsernameTextField';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';

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
      username: '',
      email: '',
      password: '',
      confirmedPassword: '',
   });

   const handleCreateAccountChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      let currentValue;
      if (event.target.name === 'username' || event.target.name === 'email') {
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
            let response: any = await axios.post(`/api/signup`, signupValues);
            setOpenErrorAlert(false);
            setShowNextPage(true);
         } catch (err: any) {
            console.log('err:', err);
            setAlertSeverity('error');
            setErrorMessage(
               'An account with that username or email already exists. Try logging in instead.'
            );
            setOpenErrorAlert(true);
         }
      }
   };

   //after user is created, navigate to the next page with successful response
   return (
      <div className='signup'>
         {showNextPage ? (
            <MacroCalculatorForm
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
               <UsernameTextField
                  showSignup={showSignup}
                  handleCreateAccountChange={handleCreateAccountChange}
               />
               <EmailTextField
                  handleCreateAccountChange={handleCreateAccountChange}
               />
               <PasswordTextField
                  showTextFieldError={showTextFieldError}
                  showSignup={showSignup}
                  handleCreateAccountChange={handleCreateAccountChange}
                  errorMessage={errorMessage}
               />
               <ConfirmPasswordTextField
                  errorMessage={errorMessage}
                  showTextFieldError={showTextFieldError}
                  handleCreateAccountChange={handleCreateAccountChange}
               />
               <Button
                  data-testid='initial-signup-form-btn'
                  type='submit'
                  fullWidth
                  variant='contained'
               >
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
      </div>
   );
};
