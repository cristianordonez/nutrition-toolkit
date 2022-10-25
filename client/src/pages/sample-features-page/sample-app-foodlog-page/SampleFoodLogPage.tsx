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
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import {
   FoodLogItem,
   NutritionSummaryFoodLog,
} from '../../../../../types/types';
import { FoodLogWeekText } from '../../../components/foodlog-week-text/FoodLogWeekText';
import { SampleFoodLogDay } from './sample-foodlog-day/SampleFoodLogDay';
import './SampleFoodLogPage.scss';

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
   setNutritionSummary: Dispatch<SetStateAction<NutritionSummaryFoodLog>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setSampleFoodLogItems: Dispatch<SetStateAction<FoodLogItem[]>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   sampleFoodLogItems: FoodLogItem[];
}

const SampleFoodLogPage = ({
   setNutritionSummary,
   setAlertSeverity,
   setOpenAlert,
   setSampleFoodLogItems,
   sampleFoodLogItems,
   setAlertMessage,
}: Props) => {
   // const [dayIndex, setDayIndex] = useState<number>(); //used for tab highlighting
   const dayIndex = getDay(Date.now());
   const currentDay = format(new Date(Date.now()), 'yyyy-MM-dd');
   // const [currentDay, setCurrentDay] = useState(
   //    format(new Date(Date.now()), 'yyyy-MM-dd')
   // );

   useEffect(() => {
      axios
         .get('/api/foodLog/sample')
         .then((response) => {
            const data = response.data as unknown as {
               nutritionSummary: [NutritionSummaryFoodLog];
               sampleItems: FoodLogItem[];
            };
            setNutritionSummary(data.nutritionSummary[0]);
            setSampleFoodLogItems(data.sampleItems);
         })
         .catch((err: unknown) => {
            setAlertMessage(
               'Unable to retrieve food log items. Please try again later.'
            );
            setAlertSeverity('error');
            setOpenAlert(true);
            console.log('err: ', err);
         });
   }, [currentDay]);

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
                     aria-label='change food log date'
                  >
                     {days.map((day) => (
                        <Tab disabled key={day} label={day} />
                     ))}
                  </Tabs>
               </div>
               {sampleFoodLogItems.length > 0 ? (
                  <SampleFoodLogDay sampleFoodLogItems={sampleFoodLogItems} />
               ) : (
                  <CircularProgress size={100} />
               )}
            </div>
         </div>
      </>
   );
};

export default SampleFoodLogPage;
