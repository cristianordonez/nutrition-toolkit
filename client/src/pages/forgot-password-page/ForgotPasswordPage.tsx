import { AlertColor, Button, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomAlert } from '../../components/custom-alert/CustomAlert';
import { EmailTextField } from '../../components/form-input-components/email-textfield/EmailTextField';
import './ForgotPasswordPage.scss';

const ForgotPasswordPage = () => {
   const [email, setEmail] = useState<string>('');
   const [openAlert, setOpenAlert] = useState(false);
   const [alertMessage, setAlertMessage] = useState<string>('');
   const [alertSeverity, setAlertSeverity] = useState<AlertColor>('error');
   const navigate = useNavigate();
   const handleAlertChange = () => {
      setOpenAlert(!openAlert);
   };

   const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
      let currentEmail = event.target.value.toLowerCase();
      setEmail(currentEmail);
   };

   const handleSubmit = async (event: SyntheticEvent) => {
      event.preventDefault();

      try {
         let axiosResponse = await axios.post('/api/forgotPassword', { email });
         setEmail('');
         setAlertSeverity('success');
         setAlertMessage(axiosResponse.data);
         setOpenAlert(true);
         navigate('/login', {
            state: { sentRecoveryEmail: true },
            replace: true,
         });
      } catch (err: any) {
         setAlertSeverity('error');
         setAlertMessage(err.response.data);
         setOpenAlert(true);
      }
   };

   return (
      <>
         <div className='forgot-password-page'>
            <Paper
               sx={{
                  maxWidth: '360px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
               }}
               component='form'
               onSubmit={handleSubmit}
            >
               <Typography variant='body1'>
                  Forgot your account's password or having trouble logging in?
                  Enter your email address you used to sign up for an account
                  and we'll send you a recovery link.
               </Typography>
               <EmailTextField handleCreateAccountChange={handleEmailChange} />
               <Button type='submit' variant='contained'>
                  Send recovery email
               </Button>
            </Paper>
         </div>
         <CustomAlert
            openAlert={openAlert}
            handleAlert={handleAlertChange}
            alertSeverity={alertSeverity}
            alertMessage={alertMessage}
         />
      </>
   );
};

export default ForgotPasswordPage;
