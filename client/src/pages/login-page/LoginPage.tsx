import React, { useState } from 'react';
import './LoginPage.scss';
import LoginForm from '../../components/login/LoginForm';
import SignupForm from '../../components/sign-up/SignupForm';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const LoginPage = () => {
   const [showSignup, setShowSignup] = useState(false);
   const [loginValues, setLoginValues] = useState({
      username: '',
      password: '',
      email: '',
   });

   //toggles showSignup state so user can either login or see the signup component
   const handleRedirectToSignup = () => {
      setShowSignup(!showSignup);
   };

   //holds state of the login forms values to be able to submit
   const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoginValues({
         ...loginValues,
         [event.target.name]: event.target.value,
      });
      console.log('loginValues:', loginValues);
   };

   const handleLogin = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      try {
         let response = await axios.post(`${__API__}/login`);
         console.log('response:', response);
      } catch (err) {
         console.log('err:', err);
      }
   };
   const usernameTextField = (
      <TextField
         required
         onChange={handleLoginChange}
         label='Username'
         type='text'
         variant='filled'
         name='username'
         fullWidth
         helperText='Enter your username'
      />
   );

   const emailTextField = (
      <TextField
         required
         onChange={handleLoginChange}
         label='Email'
         type='email'
         name='email'
         variant='filled'
         fullWidth
         helperText='Enter your email'
      />
   );

   const passwordTextField = (
      <TextField
         required
         onChange={handleLoginChange}
         label='Password'
         type='password'
         name='password'
         variant='filled'
         fullWidth
         helperText='Enter your password'
      />
   );

   const confirmPasswordTextField = (
      <TextField
         required
         label='Confirm Password'
         type='password'
         name='confirmedPassword'
         variant='filled'
         fullWidth
         helperText='Confirm your password'
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
      </div>
   );
};

export default LoginPage;
