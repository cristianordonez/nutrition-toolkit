import React, { useState } from 'react';
import './SampleCalculatorPage.scss';
import { Calculator } from '../../components/calculator-contents/Calculator';
import NavBar from '../../components/navbar/NavBar';
import { CustomAlert } from '../../components/custom-alert/CustomAlert';
import { AlertColor, Paper, Button, Stack, Typography } from '@mui/material';

const SampleCalculatorPage = () => {
   const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');
   const [openAlert, setOpenAlert] = useState(false);
   const [alertMessage, setAlertMessage] = useState(''); //message displayed on snackbar
   const [showNextPage, setShowNextPage] = useState<boolean>(false);
   const [showSignup, setShowSignup] = useState<boolean>(false);
   const handleAlert = () => {
      setOpenAlert(!openAlert);
   };
   const [activityLevel, setActivityLevel] = React.useState<number>(1);
   const [gender, setGender] = React.useState('male');
   const [age, setAge] = React.useState<any>(18);
   const [height, setHeight] = React.useState<any>(60);
   const [weight, setWeight] = React.useState<any>(200);

   const handleGenderChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string
   ) => {
      setGender(newAlignment);
   };

   //ACTIVITY LEVEL HANDLERS
   const handleActivityLevelChange = (
      event: React.MouseEvent<HTMLElement>,
      newActivityLevel: number
   ) => {
      setActivityLevel(newActivityLevel);
   };

   //todo after submit show the results of calculations
   const hanldeSubmit = (event: React.SyntheticEvent) => {
      event.preventDefault();
   };
   return (
      <>
         <NavBar />
         <Stack
            direction='column'
            alignItems='center'
            justifyContent={'center'}
            sx={{ pt: '2rem' }}
            spacing={2}
         >
            <Typography variant='h2'>MacroCalculator</Typography>
            <Paper elevation={1} className='calculator-page' component='form'>
               <Typography variant='body1'>
                  Enter your personal metrics below to determine your
                  recommended calorie and macronutrient ranges
               </Typography>
               <Calculator
                  handleGenderChange={handleGenderChange}
                  gender={gender}
                  activityLevel={activityLevel}
                  handleActivityLevelChange={handleActivityLevelChange}
                  age={age}
                  setAge={setAge}
                  height={height}
                  setHeight={setHeight}
                  weight={weight}
                  setWeight={setWeight}
               />
               <Button fullWidth type='submit' variant='contained'>
                  Calculate
               </Button>
            </Paper>
            <CustomAlert
               openAlert={openAlert}
               handleAlert={handleAlert}
               alertSeverity={alertSeverity}
               alertMessage={alertMessage}
            />
         </Stack>
      </>
   );
};

export default SampleCalculatorPage;
