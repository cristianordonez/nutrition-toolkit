import React, { useState } from 'react';
import './LoginPage.scss';
import { LoginForm } from '../../components/login-form/LoginForm';
import { SignupForm } from '../../components/sign-up/SignupForm';
import { Snackbar, Alert } from '@mui/material';

export const LoginPage = () => {
   const [showSignup, setShowSignup] = useState(false);
   const [error, setError] = useState(false); //this is used to show the error helper text on textfields
   const [openErrorAlert, setOpenErrorAlert] = useState(false);
   const [errorMessage, setErrorMessage] = useState(''); //message displayed on snackbar

   //handles showing snackbar if request to server to login is not successful
   const handleErrorAlert = () => {
      setOpenErrorAlert(!openErrorAlert);
   };

   //toggles showSignup state so user can either login or see the signup component
   const handleRedirectToSignup = () => {
      setShowSignup(!showSignup);
   };

   return (
      <div>
         {showSignup ? (
            <SignupForm
               showSignup={showSignup}
               handleRedirectToSignup={handleRedirectToSignup}
               error={error}
               setError={setError}
               errorMessage={errorMessage}
               setErrorMessage={setErrorMessage}
               setOpenErrorAlert={setOpenErrorAlert}
            />
         ) : (
            <LoginForm
               showSignup={showSignup}
               handleRedirectToSignup={handleRedirectToSignup}
               error={error}
               setError={setError}
               errorMessage={errorMessage}
               setErrorMessage={setErrorMessage}
               handleErrorAlert={handleErrorAlert}
            />
         )}
         <Snackbar
            open={openErrorAlert}
            autoHideDuration={8000}
            onClose={handleErrorAlert}
         >
            <Alert
               onClose={handleErrorAlert}
               severity='error'
               sx={{ width: '100%' }}
            >
               {errorMessage}
            </Alert>
         </Snackbar>
      </div>
   );
};
