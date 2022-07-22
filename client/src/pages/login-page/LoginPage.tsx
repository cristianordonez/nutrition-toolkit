import React, { useState } from 'react';
import './LoginPage.scss';
import { LoginForm } from '../../components/login-form/LoginForm';
import { SignupForm } from '../../components/sign-up/SignupForm';
import { CustomAlert } from '../../components/shared/CustomAlert';
import { Snackbar, Alert, AlertColor } from '@mui/material';

export const LoginPage = () => {
   const [showSignup, setShowSignup] = useState(false);
   const [alertSeverity, setAlertSeverity] = useState<AlertColor | undefined>(
      'success'
   );
   const [showTextFieldError, setShowTextFieldError] = useState(false); //this is used to show the showTextFieldError helper text on textfields
   const [openErrorAlert, setOpenErrorAlert] = useState(false);
   const [errorMessage, setErrorMessage] = useState(''); //message displayed on snackbar

   //handles showing snackbar if request to server to login is not successful
   const handleAlert = () => {
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
               setShowSignup={setShowSignup}
               setAlertSeverity={setAlertSeverity}
               handleRedirectToSignup={handleRedirectToSignup}
               showTextFieldError={showTextFieldError}
               setShowTextFieldError={setShowTextFieldError}
               errorMessage={errorMessage}
               setErrorMessage={setErrorMessage}
               setOpenErrorAlert={setOpenErrorAlert}
            />
         ) : (
            <LoginForm
               showSignup={showSignup}
               handleRedirectToSignup={handleRedirectToSignup}
               showTextFieldError={showTextFieldError}
               setShowTextFieldError={setShowTextFieldError}
               errorMessage={errorMessage}
               setErrorMessage={setErrorMessage}
               handleErrorAlert={handleAlert}
            />
         )}
         {/* <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={openErrorAlert}
            autoHideDuration={8000}
            onClose={handleErrorAlert}
         >
            <Alert
               onClose={handleErrorAlert}
               severity={alertSeverity}
               sx={{ width: '100%' }}
            >
               {errorMessage}
            </Alert>
         </Snackbar> */}
         <CustomAlert
            openAlert={openErrorAlert}
            handleAlert={handleAlert}
            alertSeverity={alertSeverity}
            alertMessage={errorMessage}
         />
      </div>
   );
};
