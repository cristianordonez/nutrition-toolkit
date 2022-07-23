import React, { useState, useEffect } from 'react';
import { DailyGoals } from '../../components/shared/daily-goals';
import { CustomAlert } from '../../components/shared/CustomAlert';
import { AlertColor } from '@mui/material';
import axios from 'axios';
import { GoalsType } from '../../../types/types';
import NavBar from '../../components/navbar/NavBar';
import { useAuth } from '../../context/authContext';

export const UserSettingsPage = () => {
   const isLoading = useAuth();
   const [openAlert, setOpenAlert] = useState<boolean>(false);
   const [alertSeverity, setAlertSeverity] = useState<AlertColor>('error');
   const [alertMessage, setAlertMessage] = useState<string>('');
   const [goals, setGoals] = useState({} as GoalsType);
   const handleAlert = () => {
      setOpenAlert(!openAlert);
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
         console.log('totalCalories: ', totalCalories);
         let minCalPerMeal = totalCalories <= 450 ? 0 : totalCalories / 3 - 150;
         let currentGoals = {
            ...goals,
            total_calories: totalCalories,
            min_calories_per_meal: Math.floor(minCalPerMeal),
            max_calories_per_meal: Math.floor(totalCalories / 3 + 150),
         };
         console.log('currentGoals: ', currentGoals);
         setGoals(currentGoals);
         let updatedGoals = await axios.put('/api/metrics', currentGoals);
         if (updatedGoals.status === 201) {
            setAlertMessage('Your Macronutrient goals have been updated!');
            setAlertSeverity('success');
            setOpenAlert(true);
         }
      } catch (err) {
         console.log('err in handle submit goals: ', err);
         setAlertMessage('Could not update goals. Please try again.');
         setAlertSeverity('error');
         setOpenAlert(true);
      }
   };

   return isLoading ? null : (
      <>
         <NavBar isLoggedIn={true} />
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
      </>
   );
};
