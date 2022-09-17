import { AlertColor } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { MealplanItemType } from '../../../../../../types/types';
import { MealplanDay } from './mealplan-single-day/MealplanDay';
interface Props {
   mealplanItems: MealplanItemType[];
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setMealPlanItems: Dispatch<SetStateAction<MealplanItemType[] | []>>;
   currentDay: string;
}

//gets list of meal plan items, then renders one mealplanitem component per item
export const MealplanDays = ({
   mealplanItems,
   setMealPlanItems,
   setOpenAlert,
   setAlertSeverity,
   setAlertMessage,
   currentDay,
}: Props) => {
   let breakfastItems: MealplanItemType[] = [];
   let lunchItems: MealplanItemType[] = [];
   let dinnerItems: MealplanItemType[] = [];

   if (mealplanItems.length) {
      mealplanItems.forEach((item) => {
         if (item.slot === 1) {
            breakfastItems.push(item);
         } else if (item.slot === 2) {
            lunchItems.push(item);
         } else {
            dinnerItems.push(item);
         }
      });
   }
   const mealTypes = ['Morning', 'Afternoon', 'Evening'];
   const mealItems = [breakfastItems, lunchItems, dinnerItems];

   return (
      <>
         {mealItems.map((meals, index) => (
            <MealplanDay
               key={index}
               type={mealTypes[index]}
               meals={meals}
               setOpenAlert={setOpenAlert}
               setAlertSeverity={setAlertSeverity}
               setAlertMessage={setAlertMessage}
               setMealPlanItems={setMealPlanItems}
               currentDay={currentDay}
            />
         ))}
      </>
   );
};
