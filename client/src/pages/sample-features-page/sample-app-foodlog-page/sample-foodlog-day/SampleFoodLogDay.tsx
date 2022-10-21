import React, { useState } from 'react';
import { FoodLogItem } from '../../../../../../types/types';
import { SampleFoodLogSlot } from './sample-foodlog-slot/SampleFoodlogSlot';
import './SampleFoodLogDay.scss';

interface Props {
   sampleFoodLogItems: FoodLogItem[];
}
export const SampleFoodLogDay = ({ sampleFoodLogItems }: Props) => {
   const [openDialog, setOpenDialog] = useState(false);
   const [showNutrientDataForm, setShowNutrientDataForm] =
      useState<boolean>(false);

   let breakfastItems: FoodLogItem[] = [];
   let lunchItems: FoodLogItem[] = [];
   let dinnerItems: FoodLogItem[] = [];
   let snackItems: FoodLogItem[] = [];

   if (sampleFoodLogItems.length) {
      sampleFoodLogItems.forEach((item) => {
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
               <SampleFoodLogSlot
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
