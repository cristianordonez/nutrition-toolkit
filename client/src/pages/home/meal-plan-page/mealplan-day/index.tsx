import { AlertColor, Stack } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
   MealplanItem,
   NutritionSummaryMealplan,
} from '../../../../../../types/types';
import { AddCustomFoodDialog } from './AddCustomFoodDialog';
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
   const [openDialog, setOpenDialog] = useState(true); //TODO change to false
   const [currentSlot, setCurrentSlot] = useState<number>(0);
   const [showNutrientDataForm, setShowNutrientDataForm] =
      useState<boolean>(false); //controls showing second part of create new food dialog
   //showNutrientDataForm state was moved here because when canceling before submitting it was still showing second part of form

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
   const slotNumbers = [1, 2, 3, 4];
   const mealItems = [breakfastItems, lunchItems, dinnerItems, snackItems];

   const handleOpeningDialog = () => {
      setOpenDialog(!openDialog);
      setTimeout(() => {
         setShowNutrientDataForm(false);
      }, 1000);
   };
   return (
      <>
         <Stack direction='column' spacing={4} sx={{ width: '100%' }}>
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
                  handleOpeningDialog={handleOpeningDialog}
                  setCurrentSlot={setCurrentSlot}
                  slot={slotNumbers[index]}
               />
            ))}
            <AddCustomFoodDialog
               openDialog={openDialog}
               showNutrientDataForm={showNutrientDataForm}
               setShowNutrientDataForm={setShowNutrientDataForm}
               handleOpeningDialog={handleOpeningDialog}
               currentSlot={currentSlot}
               currentDay={currentDay}
               setOpenAlert={setOpenAlert}
               setAlertSeverity={setAlertSeverity}
               setAlertMessage={setAlertMessage}
               setOpenDialog={setOpenDialog}
               setMealPlanItems={setMealPlanItems}
            />
         </Stack>
      </>
   );
};
