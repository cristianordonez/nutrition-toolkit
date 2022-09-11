import React, { useState, useEffect } from 'react';
import './UserProfilePage.scss';
import { SideBar } from '../../../components/sidebar/SideBar';
import { DailyGoals } from '../../../components/daily-goals';
import { CustomAlert } from '../../../components/custom-alert/CustomAlert';
import {
   AlertColor,
   Button,
   Typography,
   Stack,
   Paper,
   Toolbar,
   IconButton,
} from '@mui/material';
import axios from 'axios';
import { CurrentGoals } from '../../../../../types/types';
import { useAuth } from '../../../context/authContext';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const UserSettingsPage = () => {
   const { isLoading, isLoggedIn, username } = useAuth();
   const [openAlert, setOpenAlert] = useState<boolean>(false);
   const [alertSeverity, setAlertSeverity] = useState<AlertColor>('error');
   const [alertMessage, setAlertMessage] = useState<string>('');
   const [goals, setGoals] = useState({} as CurrentGoals);
   const [mobileOpen, setMobileOpen] = React.useState(false);

   const handleAlert = () => {
      setOpenAlert(!openAlert);
   };

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   useEffect(() => {
      axios
         .get('/api/metrics')
         .then((results) => {
            setGoals(results.data);
         })
         .catch((err) => {
            setAlertMessage(
               'Could not retrieve your daily goals. Please try again later.'
            );
            setAlertSeverity('error');
            setOpenAlert(true);
         });
   }, []);

   const handleSubmitUpdatedGoals = async (event: React.FormEvent) => {
      event.preventDefault();
      try {
         let totalCalories = Math.floor(
            goals.total_carbohydrates * 4 +
               goals.total_protein * 4 +
               goals.total_fat * 9
         );
         let minCalPerMeal = totalCalories <= 450 ? 0 : totalCalories / 3 - 150;
         let currentGoals = {
            ...goals,
            total_calories: totalCalories,
            min_calories_per_meal: Math.floor(minCalPerMeal),
            max_calories_per_meal: Math.floor(totalCalories / 3 + 150),
         };
         setGoals(currentGoals);
         let updatedGoals = await axios.put('/api/metrics', currentGoals);
         if (updatedGoals.status === 201) {
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
         {goals !== undefined && Object.keys(goals).length > 0 ? (
            <SideBar
               mobileOpen={mobileOpen}
               handleDrawerToggle={handleDrawerToggle}
               page='user-profile'
               goals={goals}
            />
         ) : null}
         <div className='user-profile-page'>
            <Paper className='user-profile-container'>
               <Toolbar
                  sx={{ display: { sm: 'none' }, alignSelf: 'flex-start' }}
               >
                  <IconButton
                     color='inherit'
                     aria-label='open drawer'
                     edge='start'
                     onClick={handleDrawerToggle}
                     sx={{ mr: 2, display: { sm: 'none' } }}
                  >
                     <ArrowForwardIosIcon />
                  </IconButton>
               </Toolbar>
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
               <DailyGoals
                  goals={goals}
                  page={'user-profile'}
                  setGoals={setGoals}
                  handleSubmitUpdatedGoals={handleSubmitUpdatedGoals}
               />
               <CustomAlert
                  openAlert={openAlert}
                  handleAlert={handleAlert}
                  alertSeverity={alertSeverity}
                  alertMessage={alertMessage}
               />
            </Paper>
         </div>
      </>
   );
};

export default UserSettingsPage;
