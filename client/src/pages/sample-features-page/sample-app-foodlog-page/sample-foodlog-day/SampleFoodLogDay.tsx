import React from 'react';
import { FoodLogItem } from '../../../../../../types/types';
import { SampleFoodLogSlot } from './sample-foodlog-slot/SampleFoodlogSlot';
import './SampleFoodLogDay.scss';

interface Props {
   sampleFoodLogItems: FoodLogItem[];
}
export const SampleFoodLogDay = ({ sampleFoodLogItems }: Props) => {
   const breakfastItems: FoodLogItem[] = [];
   const lunchItems: FoodLogItem[] = [];
   const dinnerItems: FoodLogItem[] = [];
   const snackItems: FoodLogItem[] = [];

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
   const mealItems = [breakfastItems, lunchItems, dinnerItems, snackItems];

   return (
      <>
         <div className='meal-plan-slots-container'>
            {mealItems.map((meals, index) => (
               <SampleFoodLogSlot
                  key={meals[0].fdc_id}
                  slotName={mealSlotTitles[index]}
                  meals={meals}
               />
            ))}
         </div>
      </>
   );
};
