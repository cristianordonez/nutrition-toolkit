import React, { Dispatch, SetStateAction } from 'react';
import './index.scss';
import axios from 'axios';
import {
   Paper,
   Stack,
   Typography,
   Button,
   ToggleButtonGroup,
   ToggleButton,
   AlertColor,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Box,
} from '@mui/material';
import { HeightInputField } from './HeightInputField';
import { WeightInputField } from './WeightInputField';
import { AgeInputField } from './AgeInputField';
import { useMetrics } from '../../../helper-functions/use-metrics/useMetrics';
import { useNavigate } from 'react-router-dom';
import { BsCalculatorFill } from 'react-icons/bs';
interface Props {
   setOpenErrorAlert: Dispatch<SetStateAction<boolean>>;
   setErrorMessage: Dispatch<SetStateAction<string>>;
   setShowNextPage: Dispatch<SetStateAction<boolean>>;
   setShowSignup: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor | undefined>>;
   page?: string;
   showNextPage?: boolean | any;
}

export const MacroCalculatorForm = ({
   setOpenErrorAlert,
   setErrorMessage,
   setShowNextPage,
   setShowSignup,
   setAlertSeverity,
   showNextPage,
   page, //used to mark whether this is being shown as part of signup form or as its own page
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
         if (page === 'macrocalculator') {
            setErrorMessage(
               'You have updated your macronutrient needs. Go to search page to begin searching for recipes, menu items, or grocery products within this range.'
            );
         } else {
            setErrorMessage(
               'You have successfully created an account. Please login.'
            );
         }
         setAlertSeverity('success');
         setOpenErrorAlert(true);
         setShowNextPage(false);
         setShowSignup(false);
      } catch (err) {
         console.log('err:', err);
      }
   };

   return (
      <div className='macro-calculator-container'>
         <Paper
            onSubmit={handleSubmit}
            component={'form'}
            className='macro-calculator-form'
            data-testid='macro-calculator-signup-form'
            elevation={2}
         >
            {page !== undefined && page === 'macrocalculator' ? (
               <>
                  <Stack direction='row' sx={{ gap: '1em' }}>
                     <BsCalculatorFill className='macro-calculator-icon' />
                     <Typography align='center' variant='h6'>
                        Recalculate your Macronutrient Recommendations
                     </Typography>
                  </Stack>
                  <Typography variant='subtitle1'>
                     Fill out the form below to recalculate your recommended
                     nutrient needs (note that all recommendations are made for
                     individuals with Type 2 Diabetes).
                  </Typography>
               </>
            ) : (
               <>
                  <Typography variant='h6'>
                     Complete setting up your account
                  </Typography>
                  <Typography variant='subtitle1'>
                     Fill out the form below so we can calculate your
                     recommended nutrient needs (note that all recommendations
                     are made for individuals with Type 2 Diabetes).
                  </Typography>
               </>
            )}
            {/* GENDER */}
            <ToggleButtonGroup
               color='primary'
               fullWidth={true}
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
               fullWidth={true}
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

            {page !== undefined && page === 'macrocalculator' ? (
               <Button
                  fullWidth
                  data-testid='recalculate-btn'
                  onClick={() => setShowNextPage(true)}
                  variant='contained'
               >
                  Recalculate
               </Button>
            ) : (
               <Button fullWidth type='submit' variant='contained'>
                  Complete creating account
               </Button>
            )}
            {page !== undefined && page === 'macrocalculator' ? (
               <Dialog open={showNextPage}>
                  <DialogTitle>
                     Are you sure you want to recalculate your macronutrient
                     needs? This will overwrite your current settings.
                  </DialogTitle>
                  <form>
                     <DialogContent>
                        <Box
                           display='flex'
                           flexDirection='column'
                           gap='10px'
                        ></Box>
                     </DialogContent>
                     <DialogActions>
                        <Button
                           variant='contained'
                           aria-label='submit form to recalculate macronutrients'
                           type='submit'
                        >
                           Confirm
                        </Button>
                        <Button
                           color='error'
                           variant='contained'
                           onClick={() => setShowNextPage(false)}
                        >
                           Cancel
                        </Button>
                     </DialogActions>
                  </form>
               </Dialog>
            ) : null}
         </Paper>
      </div>
   );
};
