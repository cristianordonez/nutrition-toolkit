import GoogleIcon from '@mui/icons-material/Google';
import { AlertColor, Button, Paper, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomTextField } from '../../../components/form-input-components/custom-textfield/CustomTextField';
import { useAuth } from '../../../context/authContext';
import LoginSvg from '../../../img/secure_login.svg';
import './LoginForm.scss';

interface Props {
   showSignup: boolean;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   handleRedirectToSignup: () => void;
   showTextFieldError: boolean;
   setShowTextFieldError: Dispatch<SetStateAction<boolean>>;
   errorMessage: string;
   setErrorMessage: Dispatch<SetStateAction<string>>;
   handleErrorAlert: () => void;
}

export const LoginForm = ({
   showSignup,
   setAlertSeverity,
   handleRedirectToSignup,
   showTextFieldError,
   setShowTextFieldError,
   errorMessage,
   setErrorMessage,
   handleErrorAlert,
}: Props) => {
   const navigate = useNavigate();
   const { setIsLoggedIn } = useAuth() as unknown as {
      setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
   };

   // state value must be called 'username' for passport local strategy to work
   const [loginValues, setLoginValues] = useState({
      username: '',
      password: '',
   });

   /**
    * Update state with login/password information
    * @param event event triggered on login button click
    */
   const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let currentValue;
      if (event.target.name === 'username') {
         currentValue = event.target.value.toLowerCase();
      } else {
         currentValue = event.target.value;
      }
      setLoginValues({
         ...loginValues,
         [event.target.name]: currentValue,
      });
   };

   /**
    * Handle user login and navigation
    * @param event user clicks on login btn
    */
   const handleLogin = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      try {
         const response = await axios.post('/api/login', loginValues, {
            withCredentials: true,
         });
         if (response.status === 201) {
            setIsLoggedIn(true);
            setShowTextFieldError(false);
            navigate(`/home`, { replace: true });
         }
      } catch (err) {
         console.error(err);
         setAlertSeverity('error');
         setErrorMessage('No matching username and password found.'); //showTextFieldError message used in the snackbar
         setShowTextFieldError(true); //used to show showTextFieldError helper text in text field
         handleErrorAlert();
      }
   };

   const handleRedirectToForgotPassword = () => {
      navigate('/account-recovery');
   };

   return (
      <>
         <div className='login-form'>
            <img src={LoginSvg} />
            <div className='login-form-card'>
               <Paper
                  component={'form'}
                  elevation={2}
                  onSubmit={handleLogin}
                  className='login-form-input'
               >
                  <Typography variant='h6'>Log in</Typography>
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
                  <CustomTextField
                     value={loginValues.username}
                     showSignup={showSignup}
                     handleLoginChange={handleLoginChange}
                     name={'username'}
                     showTextFieldError={undefined}
                     label={'Email'}
                     type='email'
                     placeholder='Email'
                     errorMessage=''
                     helperText='Enter your email.'
                  />
                  <CustomTextField
                     showTextFieldError={showTextFieldError}
                     showSignup={showSignup}
                     errorMessage={errorMessage}
                     name='password'
                     label='Password'
                     type='password'
                     helperText='Enter your password'
                     placeholder='Password'
                     value={loginValues.password}
                     handleLoginChange={handleLoginChange}
                  />
                  <Stack alignItems='flex-end' sx={{ width: '100%' }}>
                     <Typography
                        align='center'
                        className='login-form-text'
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                        onClick={handleRedirectToForgotPassword}
                        variant='caption'
                     >
                        Forgot password?
                     </Typography>
                  </Stack>
                  <Button
                     data-testid='login-btn'
                     type='submit'
                     fullWidth
                     variant='contained'
                  >
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
                           data-testid='create-account-btn'
                           className='login-form-text'
                           variant='caption'
                           color='textPrimary'
                           sx={{ textDecoration: 'underline' }}
                        >
                           Create Account
                        </Typography>
                     </Button>
                  </Stack>
               </Paper>
            </div>
         </div>
      </>
   );
};
