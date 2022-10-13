import React, { useState } from 'react';
import { MealplanItem } from '../../../../../../types/types';
import { SampleMealplanSlot } from './sample-mealplan-slot/SampleMealplanSlot';
import './SampleMealplanDay.scss';

interface Props {
   sampleMealplanItems: MealplanItem[];
}
export const SampleMealPlanDay = ({ sampleMealplanItems }: Props) => {
   const [openDialog, setOpenDialog] = useState(false);
   const [showNutrientDataForm, setShowNutrientDataForm] =
      useState<boolean>(false);

   let breakfastItems: MealplanItem[] = [];
   let lunchItems: MealplanItem[] = [];
   let dinnerItems: MealplanItem[] = [];
   let snackItems: MealplanItem[] = [];

   if (sampleMealplanItems.length) {
      sampleMealplanItems.forEach((item) => {
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
         <div className='meal-plan-slots-container'>
            {mealItems.map((meals, index) => (
               <SampleMealplanSlot
                  key={meals[0].fdc_id}
                  slotName={mealSlotTitles[index]}
                  meals={meals}
                  handleOpeningDialog={handleOpeningDialog}
                  slot={slotNumbers[index] as 1 | 2 | 3 | 4}
               />
            ))}
         </div>
      </>
   );
};
