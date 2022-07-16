import React, { useState, useEffect } from 'react';
import './MealPlanPage.scss';
import { SidebarMealplan } from '../../components/sidebar-mealplan/SideBarMealPlan';
import { DateSelectForm } from '../../components/date-select-form/DateSelectForm';
import { MealplanDay, MealplanItemType } from '../../components/mealplan-day';
import { CustomAlert } from '../../components/shared/CustomAlert';
import { Typography, Tabs, Tab, AlertColor, Stack } from '@mui/material';
import axios from 'axios';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';

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
   const [value, setValue] = React.useState<any>(new Date(Date.now()));
   const [mobileOpen, setMobileOpen] = React.useState(false);
   const [nutritionSummary, setNutritionSummary] = useState<any[]>([]);
   const handleClose = (event: React.SyntheticEvent | Event) => {
      setOpenSnackbar(false);
   };

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   //need to configure so that day is also changed when tab changes
   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
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
         setBreakfastItems([]);
         setDayIndex(newValue);
         setLunchItems([]);
         setDinnerItems([]);
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

   useEffect(() => {
      handleDateChange();
   }, [currentDay]);

   const handleDateChange = async () => {
      try {
         let response = await axios.get('/api/mealplan/day', {
            params: { date: currentDay },
            withCredentials: true,
         });
         console.log(
            'response.data:',
            response.data.nutritionSummary.nutrients
         );
         setNutritionSummary(response.data.nutritionSummary.nutrients);
         console.log('nutritionSummary:', nutritionSummary);
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
   console.log('mealplanItems:', mealplanItems);
   return (
      <div className='mealplan-page'>
        
        <SidebarMealplan
            mobileOpen={mobileOpen}
            page={'mealplan'}
            handleDrawerToggle={handleDrawerToggle}
            nutritionSummary={nutritionSummary}
         />
         <Stack direction={'row'}>
            <Typography variant='h1'>Meal Planner</Typography>
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
      </div>
   );
};
