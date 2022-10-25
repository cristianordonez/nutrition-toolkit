import SettingsIcon from '@mui/icons-material/Settings';
import { Paper, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { DailyGoalsUserProfile } from '../../../components/daily-goals/daily-goals-user-profile/DailyGoalsUserProfile';
import { useAuth } from '../../../context/authContext';
import { useHomeOutlet } from '../../../hooks/useHomeOutlet';
import './UserProfilePage.scss';

const UserProfilePage = () => {
   const { setAlertMessage, setOpenAlert, setAlertSeverity, goals, setGoals } =
      useHomeOutlet();

   const { isLoading, username } = useAuth();

   const handleSubmitUpdatedGoals = async (event: React.FormEvent) => {
      event.preventDefault();
      try {
         const totalCalories = Math.floor(
            goals.total_carbohydrates * 4 +
               goals.total_protein * 4 +
               goals.total_fat * 9
         );
         const currentGoals = {
            ...goals,
            total_calories: totalCalories,
         };
         const updatedGoals = await axios.put('/api/goals', currentGoals);
         if (updatedGoals.status === 201) {
            setGoals(updatedGoals.data);
            setAlertMessage('Your Macronutrient goals have been updated!');
            setAlertSeverity('success');
            setOpenAlert(true);
         }
      } catch (err) {
         setAlertMessage('Could not update goals. Please try again.');
         setAlertSeverity('error');
         setOpenAlert(true);
      }
   };

   return isLoading ? null : (
      <>
         <div className='user-profile-page'>
            <Paper className='user-profile-container'>
               <Stack
                  direction='row'
                  spacing={2}
                  sx={{ paddingBottom: '1rem' }}
               >
                  <SettingsIcon />
                  <Typography variant='body1' align='left'>
                     Welcome to your account, {username}! Edit your
                     macronutrient goals to a custom amount (calories will be
                     calculated based on your input).
                  </Typography>
               </Stack>
               <DailyGoalsUserProfile
                  goals={goals}
                  setGoals={setGoals}
                  handleSubmitUpdatedGoals={handleSubmitUpdatedGoals}
               />
            </Paper>
         </div>
      </>
   );
};

export default UserProfilePage;
