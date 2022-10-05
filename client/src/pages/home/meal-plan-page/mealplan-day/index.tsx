import { AlertColor, Stack } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import {
   MealplanItem,
   NutritionSummaryMealplan,
} from '../../../../../../types/types';
import { MealplanSlot } from './mealplan-slot/MealplanSlot';

interface Props {
   mealplanItems: MealplanItem[];
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setMealPlanItems: Dispatch<SetStateAction<MealplanItem[]>>;
   currentDay: string;
   setNutritionSummary: Dispatch<SetStateAction<NutritionSummaryMealplan>>;
}

//gets list of meal plan items, then renders one mealplanitem component per item
export const MealplanDay = ({
   mealplanItems,
   setMealPlanItems,
   setOpenAlert,
   setAlertSeverity,
   setAlertMessage,
   currentDay,
   setNutritionSummary,
}: Props) => {
   let breakfastItems: MealplanItem[] = [];
   let lunchItems: MealplanItem[] = [];
   let dinnerItems: MealplanItem[] = [];
   let snackItems: MealplanItem[] = [];

   if (mealplanItems.length) {
      mealplanItems.forEach((item) => {
         if (item.slot === 1) {
            breakfastItems.push(item);
         } else if (item.slot === 2) {
            lunchItems.push(item);
         } else if (item.slot === 3) {
            dinnerItems.push(item);
         } else {
            snackItems.push(item);
         }
      });
   }
   const mealSlotTitles = ['Morning', 'Afternoon', 'Evening', 'Snack'];
   const mealItems = [breakfastItems, lunchItems, dinnerItems, snackItems];

   return (
      <>
         <Stack direction='column' spacing={1} sx={{ width: '100%' }}>
            {mealItems.map((meals, index) => (
               <MealplanSlot
                  key={index}
                  slotName={mealSlotTitles[index]}
                  meals={meals}
                  setOpenAlert={setOpenAlert}
                  setAlertSeverity={setAlertSeverity}
                  setAlertMessage={setAlertMessage}
                  setMealPlanItems={setMealPlanItems}
                  currentDay={currentDay}
                  setNutritionSummary={setNutritionSummary}
               />
            ))}
         </Stack>
      </>
   );
};
