import React, { Dispatch, SetStateAction } from 'react';
import { AlertColor, Typography, Stack } from '@mui/material';
import { MealplanItemType } from '../../../../../types/types';
import { MealplanDay } from './mealplan-single-day/MealplanDay';
interface Props {
   mealplanItems: MealplanItemType[];
   setOpenSnackbar: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setMealPlanItems: Dispatch<SetStateAction<[]>>;
   currentDay: string;
}

//gets list of meal plan items, then renders one mealplanitem component per item
export const MealplanDays = ({
   mealplanItems,
   setMealPlanItems,
   setOpenSnackbar,
   setAlertSeverity,
   setAlertMessage,
   currentDay,
}: Props) => {
   if (mealplanItems.length) {
      let breakfastItems: MealplanItemType[] = [];
      let lunchItems: MealplanItemType[] = [];
      let dinnerItems: MealplanItemType[] = [];

      mealplanItems.forEach((item) => {
         if (item.slot === 1) {
            breakfastItems.push(item);
         } else if (item.slot === 2) {
            lunchItems.push(item);
         } else {
            dinnerItems.push(item);
         }
      });
      return (
         <>
            <Stack direction='column' sx={{ height: '100%', width: '100%' }}>
               <Typography variant='h3' align='center'>
                  Morning
               </Typography>
               <MealplanDay
                  meals={breakfastItems}
                  setOpenSnackbar={setOpenSnackbar}
                  setAlertSeverity={setAlertSeverity}
                  setAlertMessage={setAlertMessage}
                  setMealPlanItems={setMealPlanItems}
                  currentDay={currentDay}
               />
            </Stack>
            <Stack direction='column' sx={{ height: '100%', width: '100%' }}>
               <Typography variant='h3' align='center'>
                  Afternoon
               </Typography>
               <MealplanDay
                  meals={lunchItems}
                  setOpenSnackbar={setOpenSnackbar}
                  setAlertSeverity={setAlertSeverity}
                  setAlertMessage={setAlertMessage}
                  setMealPlanItems={setMealPlanItems}
                  currentDay={currentDay}
               />
            </Stack>
            <Stack direction='column' sx={{ height: '100%', width: '100%' }}>
               <Typography variant='h3' align='center'>
                  Evening
               </Typography>
               <MealplanDay
                  meals={dinnerItems}
                  setOpenSnackbar={setOpenSnackbar}
                  setAlertSeverity={setAlertSeverity}
                  setAlertMessage={setAlertMessage}
                  setMealPlanItems={setMealPlanItems}
                  currentDay={currentDay}
               />
            </Stack>
         </>
      );
   } else {
      return (
         <>
            <Typography variant='h3'>Morning</Typography>
            <Typography variant='h3'>Afternoon</Typography>
            <Typography variant='h3'>Evening</Typography>
         </>
      );
   }
};
