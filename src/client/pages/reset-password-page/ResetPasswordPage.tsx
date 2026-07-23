import { AlertColor, Button, Paper, Typography } from '@mui/material';

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomAlert } from '../../components/custom-alert/CustomAlert';
import { CustomTextField } from '../../components/form-input-components/custom-textfield/CustomTextField';
function useQuery() {
   return new URLSearchParams(window.location.search);
}

const ResetPasswordPage = () => {
   const navigate = useNavigate();
   const [showTextFieldError, setShowTextFieldError] = useState<boolean>(false);
   const [password, setPassword] = useState<string>('');
   const [confirmPassword, setConfirmPassword] = useState<string>('');
   const [errorMessage, setErrorMessage] = useState<string>('');
   const [alertSeverity, setAlertSeverity] = useState<AlertColor>('error');
   const [openAlert, setOpenAlert] = useState<boolean>(false);
   const [alertMessage, setAlertMessage] = useState<string>('');
   const token = useQuery().get('token');
   const id = useQuery().get('id');

   const handleAlert = () => {
      setOpenAlert(!openAlert);
   };

   const handlePasswordChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setPassword(event.target.value);
   };

   const handleConfirmPasswordChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setConfirmPassword(event.target.value);
   };

   const handleChangePasswordSubmit = async (
      event: React.FormEvent<HTMLFormElement>
   ) => {
      event.preventDefault();
      try {
         if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            setShowTextFieldError(true);
         } else {
            await axios.post('/api/resetPassword', {
               userId: id,
               token: token,
               password: password,
            });
            setShowTextFieldError(false);

            navigate('/login', {
               state: { resetPassword: true },
               replace: true,
            });
         }
      } catch (err) {
         setAlertSeverity('error');
         setAlertMessage('Unable to change password.');
         setOpenAlert(true);
         console.log(err);
      }
   };

   const showSignup = true;
   return (
      <>
         <div className='signup'>
            <Paper
               elevation={2}
               component={'form'}
               className='signup-form'
               onSubmit={handleChangePasswordSubmit}
            >
               <Typography variant='h6'>Enter your new password</Typography>
               <CustomTextField
                  showTextFieldError={showTextFieldError}
                  showSignup={showSignup}
                  handleCreateAccountChange={handlePasswordChange}
                  errorMessage={errorMessage}
                  name='password'
                  label='Password'
                  type='password'
                  helperText='Enter your password'
                  placeholder='Password'
                  value={password}
               />
               <CustomTextField
                  errorMessage={errorMessage}
                  showTextFieldError={showTextFieldError}
                  handleCreateAccountChange={handleConfirmPasswordChange}
                  type='password'
                  name='confirmedPassword'
                  placeholder='Confirm Password'
                  label='Confirm Password'
                  showSignup={true}
                  helperText={'Confirm your password.'}
                  value={confirmPassword}
               />
               <Button type='submit' variant='contained' fullWidth>
                  Change password
               </Button>
            </Paper>
         </div>
         <CustomAlert
            openAlert={openAlert}
            handleAlert={handleAlert}
            alertSeverity={alertSeverity}
            alertMessage={alertMessage}
         />
      </>
   );
};

export default ResetPasswordPage;
