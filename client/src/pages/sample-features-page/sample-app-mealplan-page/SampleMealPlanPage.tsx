import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
   AlertColor,
   CircularProgress,
   Stack,
   Tab,
   Tabs,
   Typography,
} from '@mui/material';
import axios from 'axios';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MealplanItem } from '../../../../../types/types';
import { MealPlanWeekText } from '../../../components/mealplan-week-text/MealPlanWeekText';
import '../../../index.scss';
import { SampleMealPlanDay } from './sample-mealplan-day/SampleMealplanDay';

const days = [
   'Sunday',
   'Monday',
   'Tuesday',
   'Wednesday',
   'Thursday',
   'Friday',
   'Saturday',
];

const daysMobile = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

interface Props {
   setNutritionSummary: Dispatch<SetStateAction<any>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setSampleMealplanItems: Dispatch<SetStateAction<MealplanItem[]>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   sampleMealplanItems: MealplanItem[];
}

const SampleMealPlanPage = ({
   setNutritionSummary,
   setAlertSeverity,
   setOpenAlert,
   setSampleMealplanItems,
   sampleMealplanItems,
   setAlertMessage,
}: Props) => {
   const [dayIndex, setDayIndex] = useState<number>(getDay(Date.now())); //used for tab highlighting
   const [currentDay, setCurrentDay] = useState(
      format(new Date(Date.now()), 'yyyy-MM-dd')
   );

   useEffect(() => {
      axios
         .get('/api/mealplan/sample')
         .then((response) => {
            setNutritionSummary(response.data.nutritionSummary[0]);
            setSampleMealplanItems(response.data.sampleItems);
         })
         .catch((err) => {
            setAlertMessage(
               'Unable to retrieve meal plan items. Please try again later.'
            );
            setAlertSeverity('error');
            setOpenAlert(true);
         });
   }, [currentDay]);

   return (
      <>
         <div className='mealplan-page'>
            <MealPlanWeekText currentDay={currentDay} />
            <div className='mealplan-page-main-content'>
               <Stack
                  direction='row'
                  spacing={{ xs: 1, sm: 4 }}
                  alignItems='space-evenly'
               >
                  <CalendarMonthIcon />
                  <Typography variant='body1'>
                     Log in or create an account to save items and navigate to
                     different days
                  </Typography>
               </Stack>

               <div className='tabs-container'>
                  <Tabs
                     value={dayIndex}
                     variant='scrollable'
                     scrollButtons='auto'
                     aria-label='change mealplan date'
                  >
                     {days.map((day) => (
                        <Tab disabled key={day} label={day} />
                     ))}
                  </Tabs>
               </div>
               {sampleMealplanItems.length > 0 ? (
                  <SampleMealPlanDay
                     sampleMealplanItems={sampleMealplanItems}
                  />
               ) : (
                  <CircularProgress size={100} />
               )}
            </div>
         </div>
      </>
   );
};

export default SampleMealPlanPage;
