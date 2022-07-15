import React, { useState, useEffect } from 'react';
import { SidebarMealplan } from '../../components/sidebar-mealplan';
import { DateSelectForm } from '../../components/date-select-form/DateSelectForm';
import { MealplanDay, MealplanItemType } from '../../components/mealplan-day';
import { CustomAlert } from '../../components/shared/CustomAlert';
import { Typography, Tabs, Tab, AlertColor, Stack } from '@mui/material';
import axios from 'axios';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';

const days = [
   'Sunday',
   'Monday',
   'Tuesday',
   'Wednesday',
   'Thursday',
   'Friday',
   'Saturday',
];

export const MealPlanPage = () => {
   const [dayIndex, setDayIndex] = useState<number>(getDay(Date.now())); //used for tab highlighting
   const [mealplanItems, setMealplanItems] = useState<[]>([]);
   const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
   const [alertSeverity, setAlertSeverity] = useState<AlertColor | undefined>(
      'error'
   );
   const [alertMessage, setAlertMessage] = useState<string>('');

   const [currentDay, setCurrentDay] = useState(
      format(new Date(Date.now()), 'yyyy-MM-dd')
   ); //spoonacular api needs date in format '2022-07-13'

   const [breakfastItems, setBreakfastItems] = useState<MealplanItemType[]>([]);
   const [lunchItems, setLunchItems] = useState<MealplanItemType[]>([]);
   const [dinnerItems, setDinnerItems] = useState<MealplanItemType[]>([]);

   const handleClose = (event: React.SyntheticEvent | Event) => {
      setOpenSnackbar(false);
   };

   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setDayIndex(newValue);
   };

   useEffect(() => {
      handleDateChange();
   }, [currentDay]);

   const handleDateChange = async () => {
      try {
         let response = await axios.get('/api/mealplan/day', {
            params: { date: currentDay },
            withCredentials: true,
         });
         setMealplanItems(response.data.items);
         response.data.items.forEach((item: MealplanItemType) => {
            if (item.slot === 1) {
               let currentBreakfastItems = [...breakfastItems, item];
               setBreakfastItems(currentBreakfastItems);
            } else if (item.slot === 2) {
               let currentLunchItems = [...lunchItems, item];
               setLunchItems(currentLunchItems);
            } else {
               let currentDinnerItems = [...dinnerItems, item];
               setDinnerItems(currentDinnerItems);
            }
         });
      } catch (err) {
         console.log('err in useeffect meal plan page:', err);
         setAlertSeverity('info');
         setAlertMessage(
            'You have no items saved on this day for your mealplan.'
         );
         setOpenSnackbar(true);
      }
   };

   //todo edit the new drop down calendar component and give it the current day props
   return (
      <>
         <SidebarMealplan />
         <Stack direction={'row'}>
            <Typography variant='h1'>Meal Planner</Typography>
            <DateSelectForm
               setBreakfastItems={setBreakfastItems}
               setLunchItems={setLunchItems}
               setDinnerItems={setDinnerItems}
               currentDay={currentDay}
               setCurrentDay={setCurrentDay}
               setDayIndex={setDayIndex}
            />
         </Stack>
         <Tabs value={dayIndex} onChange={handleTabChange}>
            {days.map((day) => (
               <Tab key={day} label={day} />
            ))}
         </Tabs>
         <MealplanDay
            breakfastItems={breakfastItems}
            lunchItems={lunchItems}
            dinnerItems={dinnerItems}
            setMealPlanItems={setMealplanItems}
            currentDay={currentDay}
            mealplanItems={mealplanItems}
            setOpenSnackbar={setOpenSnackbar}
            setAlertSeverity={setAlertSeverity}
            setAlertMessage={setAlertMessage}
         />
         <CustomAlert
            openAlert={openSnackbar}
            handleAlert={handleClose}
            alertSeverity={alertSeverity}
            alertMessage={alertMessage}
         />
      </>
   );
};
