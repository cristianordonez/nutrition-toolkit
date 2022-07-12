import React, { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import {
   Paper,
   Typography,
   Button,
   ToggleButtonGroup,
   ToggleButton,
   AlertColor,
} from '@mui/material';
import { HeightInputField } from './HeightInputField';
import { WeightInputField } from './WeightInputField';
import { AgeInputField } from './AgeInputField';
import { useMetrics } from '../../hooks/useMetrics';
import { useNavigate } from 'react-router-dom';

interface Props {
   setOpenErrorAlert: Dispatch<SetStateAction<boolean>>;
   setErrorMessage: Dispatch<SetStateAction<string>>;
   setShowNextPage: Dispatch<SetStateAction<boolean>>;
   setShowSignup: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor | undefined>>;
}

export const MacroCalculatorForm = ({
   setOpenErrorAlert,
   setErrorMessage,
   setShowNextPage,
   setShowSignup,
   setAlertSeverity,
}: Props) => {
   let navigate = useNavigate();
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

   //handles submission of metrics, then navigates to search page
   const handleSubmit = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      const metrics = useMetrics({
         gender,
         age,
         height,
         weight,
         activityLevel,
      });
      try {
         let response = await axios.post(`/api/metrics`, metrics);
         setErrorMessage(
            'You have successfully created an account. Please login.'
         );
         setAlertSeverity('success');
         setOpenErrorAlert(true);
         setShowNextPage(false);
         setShowSignup(false);
      } catch (err) {
         console.log('err:', err);
      }
   };

   return (
      <>
         <Paper
            onSubmit={handleSubmit}
            component={'form'}
            className='signup-form'
            data-testid='macro-calculator-signup-form'
         >
            <Typography variant='h6'>
               Complete setting up your account
            </Typography>
            <Typography variant='subtitle1'>
               Fill out the form below so we can calculate your recommended
               nutrient needs.
            </Typography>
            {/* GENDER */}
            <ToggleButtonGroup
               color='primary'
               value={gender}
               exclusive
               onChange={handleGenderChange}
            >
               <ToggleButton value='male'>Male</ToggleButton>
               <ToggleButton value='female'>Female</ToggleButton>
               <ToggleButton value='other'>Other</ToggleButton>
            </ToggleButtonGroup>
            {/* ACTIVITY LEVEL */}
            <ToggleButtonGroup
               color='primary'
               value={activityLevel}
               exclusive
               onChange={handleActivityLevelChange}
            >
               <ToggleButton value={1}>Sedentary(no exercise)</ToggleButton>
               <ToggleButton value={1.25}>
                  Moderate (2x - 4x per week)
               </ToggleButton>
               <ToggleButton value={1.5}>Active (5x+ per week)</ToggleButton>
            </ToggleButtonGroup>
            {/* AGE HEIGHT AND WEIGHT*/}
            <AgeInputField age={age} setAge={setAge} />
            <HeightInputField height={height} setHeight={setHeight} />
            <WeightInputField weight={weight} setWeight={setWeight} />

            <Button fullWidth type='submit'>
               Complete creating account
            </Button>
         </Paper>
      </>
   );
};
