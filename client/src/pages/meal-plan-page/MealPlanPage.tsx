import React, { useState, useEffect } from 'react';
import './MealPlanPage.scss';
import { SidebarMealplan } from './sidebar-mealplan/SideBarMealPlan';
import { DateSelectForm } from './date-select-form/DateSelectForm';
import { MealplanDay, MealplanItemType } from './mealplan-day';
import { CustomAlert } from '../../components/CustomAlert';
import { MealPlanWeekText } from './mealplan-week-text/MealPlanWeekText';
import {
   Typography,
   Box,
   Tabs,
   Tab,
   AlertColor,
   Stack,
   Toolbar,
   IconButton,
} from '@mui/material';
import axios from 'axios';
import format from 'date-fns/format';
import NavBar from '../../components/navbar/NavBar';
import getDay from 'date-fns/getDay';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAuth } from '../../context/authContext';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

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
   const [mealplanItems, setMealplanItems] = useState<[]>([]);
   const [mealplanItemsFound, setMealplanItemsFound] = useState<boolean>(true); //use this to display different page if no items are found
   const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
   const [alertSeverity, setAlertSeverity] = useState<AlertColor>('error');
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

   useEffect(() => {
      handleDateChange();
   }, [currentDay]);

   //handles gettings updated mealplan when date is changed from date textfield using currentDate state
   const handleDateChange = async () => {
      setMealplanItems([]); //when tab changes, reset the nutrition summary and the mealplan items
      setNutritionSummary([]);
      try {
         let response = await axios.get('/api/mealplan/day', {
            params: { date: currentDay },
            withCredentials: true,
         });
         setNutritionSummary(response.data.nutritionSummary.nutrients);
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
         console.log(err);
         setAlertSeverity('info');
         setAlertMessage(
            'You have no items saved on this day for your mealplan.'
         );
         setOpenSnackbar(true);
         setMealplanItemsFound(false);
      }
   };

   return isLoading ? null : (
      <>
         <NavBar />
         <div className='mealplan-page'>
            <Toolbar sx={{ display: { sm: 'none' } }}>
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

            <SidebarMealplan
               mobileOpen={mobileOpen}
               page='mealplan'
               handleDrawerToggle={handleDrawerToggle}
               nutritionSummary={nutritionSummary}
               mealplanItems={mealplanItems}
               mealplanItemsFound={mealplanItemsFound}
            />
            <Box
               sx={{
                  p: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
                  justifyContent: 'space-evenly',
               }}
            >
               <Stack direction='row' spacing={1}>
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
               <MealPlanWeekText currentDay={currentDay} />
               <Tabs value={dayIndex} onChange={handleTabChange}>
                  {days.map((day) => (
                     <Tab key={day} label={day} />
                  ))}
               </Tabs>

               <MealplanDay
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
            </Box>
         </div>
      </>
   );
};

export default MealPlanPage;
