import React, { useState } from 'react';
import './MealPlanPage.scss';
import { DateSelectForm } from './date-select-form/DateSelectForm';
import { MealplanDays } from './mealplan-days';
import { CustomAlert } from '../../../components/custom-alert/CustomAlert';
import { MealPlanWeekText } from '../../../components/mealplan-week-text/MealPlanWeekText';
import {
   Typography,
   Tabs,
   Tab,
   Stack,
   Toolbar,
   IconButton,
} from '@mui/material';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAuth } from '../../../context/authContext';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useMealplanOutlet } from '../../../hooks/useMealplanOutlet';

const days = [
   'Sunday',
   'Monday',
   'Tuesday',
   'Wednesday',
   'Thursday',
   'Friday',
   'Saturday',
];

const MealPlanPage = () => {
   const { isLoading, isLoggedin } = useAuth();
   const [dayIndex, setDayIndex] = useState<number>(getDay(Date.now())); //used for tab highlighting
   const [value, setValue] = React.useState<any>(new Date(Date.now()));

   const {
      handleDrawerToggle,
      setAlertMessage,
      setOpenAlert,
      setAlertSeverity,
      openAlert,
      handleAlert,
      alertSeverity,
      alertMessage,
      setNutritionSummary,
      setMealplanItemsFound,
      setMealplanItems,
      currentDay,
      setCurrentDay,
      mealplanItems,
      setBreakfastItems,
      setLunchItems,
      setDinnerItems,
   } = useMealplanOutlet();

   //need to configure so that day is also changed when tab changes
   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setMealplanItems([]); //when tab changes, reset the nutrition summary and the mealplan items
      setNutritionSummary([]);
      const prevDate = currentDay; //create variable to store the previous date and previous tab index
      const prevDayIndex = dayIndex;
      let differenceInDays = newValue - dayIndex; //find out how many days before or after current date is new selected date by finding difference between previous tab and current tab
      let newDate: Date | number | undefined;
      let { year, month, day } = getFormattedDay(currentDay);
      if (differenceInDays > 0) {
         //then update current date by adding or subtracting correct number of days
         newDate = addDays(
            new Date(`${year}, ${month}, ${day}`),
            differenceInDays
         );
      } else if (differenceInDays < 0) {
         newDate = subDays(
            new Date(`${year}, ${month}, ${day}`),
            Math.abs(differenceInDays)
         );
      }
      if (newDate !== undefined) {
         setValue(newDate); //updates the date textfield value
         setDayIndex(newValue);
         setCurrentDay(format(newDate, 'yyyy-MM-dd'));
      }
   };

   const getFormattedDay = (date: string) => {
      let dates = date.split('-');
      let year = dates[0];
      let month = dates[1];
      let day = dates[2];
      return { year, month, day };
   };

   return (
      <>
         <div className='mealplan-page'>
            <Toolbar sx={{ display: { sm: 'none' }, alignSelf: 'flex-start' }}>
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
            <MealPlanWeekText currentDay={currentDay} />
            <div className='mealplan-page-main-content'>
               <Stack
                  direction='row'
                  spacing={{ xs: 1, sm: 4 }}
                  alignItems='space-evenly'
               >
                  <Stack direction='row' spacing={0.5} sx={{ width: '50%' }}>
                     <CalendarMonthIcon />
                     <Typography variant='body1'>
                        View your daily meal plan items or begin to add items to
                        your meal plan
                     </Typography>
                  </Stack>
                  <DateSelectForm
                     setBreakfastItems={setBreakfastItems}
                     setLunchItems={setLunchItems}
                     setDinnerItems={setDinnerItems}
                     currentDay={currentDay}
                     setCurrentDay={setCurrentDay}
                     setDayIndex={setDayIndex}
                     value={value}
                     setValue={setValue}
                  />
               </Stack>
               <div className='tabs-container'>
                  <Tabs
                     value={dayIndex}
                     onChange={handleTabChange}
                     variant='scrollable'
                     scrollButtons='auto'
                     aria-label='change mealplan date'
                  >
                     {days.map((day) => (
                        <Tab key={day} label={day} />
                     ))}
                  </Tabs>
               </div>
               {isLoading ? null : (
                  <MealplanDays
                     setMealPlanItems={setMealplanItems}
                     currentDay={currentDay}
                     mealplanItems={mealplanItems}
                     setOpenAlert={setOpenAlert}
                     setAlertSeverity={setAlertSeverity}
                     setAlertMessage={setAlertMessage}
                  />
               )}
               <CustomAlert
                  openAlert={openAlert}
                  handleAlert={handleAlert}
                  alertSeverity={alertSeverity}
                  alertMessage={alertMessage}
               />
            </div>
         </div>
      </>
   );
};

export default MealPlanPage;
