import CalculateIcon from '@mui/icons-material/Calculate';
import { Button, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { BsCalculatorFill } from 'react-icons/bs';
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
      <div className='macro-calc-page'>
         <Stack direction='row' spacing={1}>
            <CalculateIcon />
            <Typography variant='body1' align='center'>
               Log in or create an account to save your goals for future
               reference
            </Typography>
         </Stack>
         <div className='macro-calculator-container'>
            <Paper
               elevation={2}
               className='macro-calculator-form'
               component='form'
               onSubmit={handleSubmit}
            >
               <Stack direction='row' sx={{ gap: '1em' }}>
                  <BsCalculatorFill className='macro-calculator-icon' />
                  <Typography align='center' variant='h6'>
                     Calculate your Macronutrient Recommendations
                  </Typography>
               </Stack>
               <Typography variant='subtitle1'>
                  Fill out the form below to calculate your recommended nutrient
                  needs
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
         </div>
      </div>
   );
};

export default SampleCalculatorPage;
