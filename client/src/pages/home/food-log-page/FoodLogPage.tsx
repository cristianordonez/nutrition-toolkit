import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { AlertColor, Stack, Tab, Tabs, Typography } from '@mui/material';
import axios from 'axios';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import subDays from 'date-fns/subDays';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
   FoodLogItem,
   NutritionSummaryFoodLog,
} from '../../../../../types/types';
import { FoodLogWeekText } from '../../../components/foodlog-week-text/FoodLogWeekText';
import { DateSelectForm } from './date-select-form/DateSelectForm';
import { FoodLogDay } from './foodlog-day';
import './FoodLogPage.scss';

const days = [
   'Sunday',
   'Monday',
   'Tuesday',
   'Wednesday',
   'Thursday',
   'Friday',
   'Saturday',
];

interface Props {
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setNutritionSummary: Dispatch<SetStateAction<NutritionSummaryFoodLog>>;
   setFoodLogItems: Dispatch<SetStateAction<FoodLogItem[]>>;
   foodLogItems: FoodLogItem[];
   setIsSearching: Dispatch<SetStateAction<boolean>>;
}

const FoodLogPage = ({
   setAlertMessage,
   setOpenAlert,
   setAlertSeverity,
   setNutritionSummary,
   setFoodLogItems,
   setIsSearching,
   foodLogItems,
}: Props) => {
   const [dayIndex, setDayIndex] = useState<number>(getDay(Date.now()));
   const [value, setValue] = React.useState<string | Date | number>(
      new Date(Date.now())
   );
   const [currentDay, setCurrentDay] = useState(
      format(new Date(Date.now()), 'yyyy-MM-dd')
   );

   useEffect(() => {
      handleDateChange(); //2. calls handledate change function
   }, [currentDay]);

   const handleDateChange = async () => {
      try {
         const dbResponse = await axios.get('/api/foodLog/day', {
            params: { date: currentDay },
            withCredentials: true,
         });
         if (dbResponse.data.foodLogItems.length === 0) {
            setAlertSeverity('info');
            setAlertMessage(
               'You have no items saved on this day for your food log.'
            );
            setOpenAlert(true);
         }
         setFoodLogItems(dbResponse.data.foodLogItems);
         setNutritionSummary(dbResponse.data.nutritionSummary);
         setIsSearching(false);
      } catch (err) {
         console.log(err);
      }
   };

   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      const differenceInDays = newValue - dayIndex; //find out how many days before or after current date is new selected date by finding difference between previous tab and current tab
      let newDate: Date | number | undefined;
      const { year, month, day } = getFormattedDay(currentDay);
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
         setCurrentDay(format(newDate, 'yyyy-MM-dd')); //1. changes currentday state
      }
   };

   const getFormattedDay = (date: string) => {
      const dates = date.split('-');
      const year = dates[0];
      const month = dates[1];
      const day = dates[2];
      return { year, month, day };
   };

   return (
      <>
         <div className='food-log-page'>
            <FoodLogWeekText currentDay={currentDay} />
            <div className='food-log-page-main-content'>
               <Stack
                  direction='row'
                  spacing={{ xs: 1, sm: 4 }}
                  alignItems='space-evenly'
               >
                  <Stack
                     direction='row'
                     spacing={0.5}
                     sx={{ width: '50%' }}
                     justifyContent='space-between'
                  >
                     <CalendarMonthIcon />
                     <Typography variant='body1'>
                        Change the current day by navigating through the tabs,
                        or change the week by using the calendar dropdown to the
                        right
                     </Typography>
                  </Stack>
                  <DateSelectForm
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
                     aria-label='change FoodLog date'
                  >
                     {days.map((day) => (
                        <Tab key={day} label={day} />
                     ))}
                  </Tabs>
               </div>

               <FoodLogDay
                  setFoodLogItems={setFoodLogItems}
                  currentDay={currentDay}
                  foodLogItems={foodLogItems}
                  setOpenAlert={setOpenAlert}
                  setAlertSeverity={setAlertSeverity}
                  setAlertMessage={setAlertMessage}
                  setNutritionSummary={setNutritionSummary}
               />
            </div>
         </div>
      </>
   );
};

export default FoodLogPage;
