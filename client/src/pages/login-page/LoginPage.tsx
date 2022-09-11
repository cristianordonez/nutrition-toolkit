import React, { useState, useEffect } from 'react';
import { Footer } from '../../components/footer/Footer';
import { LoginForm } from './login-form/LoginForm';
import { SignupForm } from './sign-up-form/SignupForm';
import { CustomAlert } from '../../components/custom-alert/CustomAlert';
import { AlertColor } from '@mui/material';
import { useLocation } from 'react-router-dom';

type LocationType = {
   pathname: string;
   key: string;
   search: string;
   state: { resetPassword: boolean };
};

const LoginPage = () => {
   const [showSignup, setShowSignup] = useState(false);
   const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');
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

   const location = useLocation() as unknown as LocationType;
   // //when logged out, react router sends state saying log out was successful to show alert
   useEffect(() => {
      if (location.state && location.state.resetPassword) {
         setAlertSeverity('success');
         setErrorMessage('Your password has been reset!');
         setOpenErrorAlert(true);
      }
   }, [location]);

   return (
      <>
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
         <Footer />
      </>
   );
};

export default LoginPage;
