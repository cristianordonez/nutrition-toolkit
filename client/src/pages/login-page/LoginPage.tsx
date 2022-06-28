import React, { useState } from 'react';
import './LoginPage.scss';
import { LoginForm } from '../../components/login-form/LoginForm';
import { SignupForm } from '../../components/sign-up/SignupForm';
import { TextField, Snackbar, Alert } from '@mui/material';
// import TextField from '@mui/material/TextField';
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
   let navigate = useNavigate();
   const [showSignup, setShowSignup] = useState(false);
   const [openErrorAlert, setOpenErrorAlert] = useState(false);
   const [error, setError] = useState(false); //this is used to show the error helper text on textfields
   const [errorMessage, setErrorMessage] = useState(''); //message displayed on snackbar
   const [showNextPage, setShowNextPage] = useState(false); //handles showing page 2 when creating account
   const [loginValues, setLoginValues] = useState({
      username: '',
      password: '',
      email: '',
   });
   const [signupValues, setSignupValues] = useState({
      username: '',
      email: '',
      password: '',
      confirmedPassword: '',
   });

   //handles showing snackbar if request to server to login is not successful
   const handleErrorAlert = () => {
      setOpenErrorAlert(!openErrorAlert);
   };

   //toggles showSignup state so user can either login or see the signup component
   const handleRedirectToSignup = () => {
      setShowSignup(!showSignup);
   };

   const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoginValues({
         ...loginValues,
         [event.target.name]: event.target.value,
      });
   };

   const handleCreateAccountChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setSignupValues({
         ...signupValues,
         [event.target.name]: event.target.value,
      });
   };

   //handles clicking continue button when creating account to create account then switch to next session
   const handleInitialSignupForm = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      if (signupValues.password !== signupValues.confirmedPassword) {
         setErrorMessage('Your passwords do not match');
         setOpenErrorAlert(true);
         setError(true);
      } else {
         try {
            let response: any = await axios.post(
               `${__API__}/signup`,
               signupValues
            );
            console.log('response:', response);
            setOpenErrorAlert(false);
            setShowNextPage(true);
         } catch (err: any) {
            console.log('err:', err);
            setErrorMessage(err.response.data);
            setOpenErrorAlert(true);
         }
      }
   };

   // //handles signing up user then redirecting to search page
   // const handleFinalSignupForm = (event: React.SyntheticEvent) => {
   //    event.preventDefault();
   // };

   const handleLogin = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      try {
         let url = `${__API__}/login`;
         let response = await axios.post(`${__API__}/login`, loginValues);
         if (response.status === 201) {
            setError(false);
            navigate(`/${response.data.id}/search`);
         }
      } catch (err: any) {
         setErrorMessage(err.response.data); //error message used in the snackbar
         setError(true); //used to show error helper text in text field
         handleErrorAlert();
         console.log('err:', err);
      }
   };

   const usernameTextField = (
      <TextField
         required
         // error={error}
         onChange={showSignup ? handleCreateAccountChange : handleLoginChange}
         label='Username'
         type='text'
         variant='filled'
         name='username'
         fullWidth
         helperText={'Enter your username'}
      />
   );

   const emailTextField = (
      <TextField
         required
         // error={error}
         onChange={handleCreateAccountChange}
         label='Email'
         type='email'
         name='email'
         variant='filled'
         fullWidth
         helperText={'Enter your email'}
      />
   );

   const passwordTextField = (
      <TextField
         required
         error={error}
         onChange={showSignup ? handleCreateAccountChange : handleLoginChange}
         label='Password'
         type='password'
         name='password'
         variant='filled'
         fullWidth
         helperText={error ? errorMessage : 'Enter your password'}
      />
   );

   const confirmPasswordTextField = (
      <TextField
         required
         error={error}
         label='Confirm Password'
         onChange={handleCreateAccountChange}
         type='password'
         name='confirmedPassword'
         variant='filled'
         fullWidth
         helperText={error ? errorMessage : 'Enter your password'}
      />
   );

   return (
      <div>
         {showSignup ? (
            <SignupForm
               usernameTextField={usernameTextField}
               emailTextField={emailTextField}
               passwordTextField={passwordTextField}
               confirmPasswordTextField={confirmPasswordTextField}
               handleRedirectToSignup={handleRedirectToSignup}
               setError={setError}
               handleInitialSignupForm={handleInitialSignupForm}
               showNextPage={showNextPage}
            />
         ) : (
            <LoginForm
               handleLogin={handleLogin}
               usernameTextField={usernameTextField}
               emailTextField={emailTextField}
               passwordTextField={passwordTextField}
               handleRedirectToSignup={handleRedirectToSignup}
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
