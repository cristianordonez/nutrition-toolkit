import React, { useState } from 'react';
import { LoginForm } from '../../components/login-form/LoginForm';
import { SignupForm } from '../../components/sign-up-form/SignupForm';
import { CustomAlert } from '../../components/shared/CustomAlert';
import { AlertColor } from '@mui/material';
import NavBar from '../../components/navbar/NavBar';

const LoginPage = () => {
   const [showSignup, setShowSignup] = useState(false);
   const [alertSeverity, setAlertSeverity] = useState<AlertColor | undefined>(
      'success'
   );
   const [showTextFieldError, setShowTextFieldError] = useState(false); //this is used to show the showTextFieldError helper text on textfields
   const [openErrorAlert, setOpenErrorAlert] = useState(false);
   const [errorMessage, setErrorMessage] = useState(''); //message displayed on snackbar

   //handles showing snackbar if request to server to login is not successful
   const handleAlert = () => {
      setOpenErrorAlert(true);
   };

   //toggles showSignup state so user can either login or see the signup component
   const handleRedirectToSignup = () => {
      setShowSignup(!showSignup);
   };

   return (
      <>
         <NavBar isLoggedIn={false} />
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
               setAlertSeverity={setAlertSeverity}
               handleRedirectToSignup={handleRedirectToSignup}
               showTextFieldError={showTextFieldError}
               setShowTextFieldError={setShowTextFieldError}
               errorMessage={errorMessage}
               setErrorMessage={setErrorMessage}
               handleErrorAlert={handleAlert}
            />
         )}
         <CustomAlert
            openAlert={openErrorAlert}
            handleAlert={handleAlert}
            alertSeverity={alertSeverity}
            alertMessage={errorMessage}
         />
      </>
   );
};

export default LoginPage;
