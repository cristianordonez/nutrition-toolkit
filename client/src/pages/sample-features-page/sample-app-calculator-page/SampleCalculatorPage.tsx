import { Button, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { Calculator } from '../../../components/calculator-contents/Calculator';
import { useSampleFeaturesOutlet } from '../../../hooks/useSampleFeaturesOutlet';
import './SampleCalculatorPage.scss';

const SampleCalculatorPage = () => {
   const {
      setGender,
      gender,
      age,
      setAge,
      height,
      setHeight,
      weight,
      setWeight,
      goal,
      setGoal,
      activityLevel,
      setActivityLevel,
      handleSubmit,
   } = useSampleFeaturesOutlet();

   const handleGenderChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string
   ) => {
      setGender(newAlignment);
   };

   const handleGoalChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: 'weight_loss' | 'maintain' | 'gain_muscle'
   ) => {
      setGoal(newAlignment);
   };

   const handleActivityLevelChange = (
      event: React.MouseEvent<HTMLElement>,
      newActivityLevel: number
   ) => {
      setActivityLevel(newActivityLevel);
   };

   return (
      <>
         <Stack
            direction='column'
            alignItems='center'
            justifyContent={'center'}
            sx={{
               pt: '2rem',
               pb: '2rem',
               pl: { xs: 0, sm: '1rem' },
               pr: { xs: 0, sm: '1rem' },
            }}
            spacing={2}
         >
            <Typography variant='h2'>MacroCalculator</Typography>
            <Paper
               elevation={1}
               className='calculator-page'
               component='form'
               onSubmit={handleSubmit}
            >
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
                  goal={goal}
                  handleGoalChange={handleGoalChange}
                  setHeight={setHeight}
                  weight={weight}
                  setWeight={setWeight}
               />
               <Button fullWidth type='submit' variant='contained'>
                  Calculate
               </Button>
            </Paper>
         </Stack>
      </>
   );
};

export default SampleCalculatorPage;
