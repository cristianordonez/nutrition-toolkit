import React from 'react';
import './SampleMealplanDay.scss';
import { FoodItemContents } from '../../../../components/food-item-contents/FoodItemContents';
import {
   FoodItemType,
   SampleMealplanItem,
} from '../../../../../../types/types';
import { Typography, Grid } from '@mui/material';

interface Props {
   mealplanItems: FoodItemType[];
   sampleMealplanItems: SampleMealplanItem[];
}
export const SampleMealPlanDay = ({
   mealplanItems,
   sampleMealplanItems, //this needs to be passed down just to get the correct number of servings
}: Props) => {
   return (
      <>
         <div className='meal-plan-slots-container'>
            {mealplanItems.map((mealplanItem, index) => (
               <div className='mealplan-day-slot' key={mealplanItem.id}>
                  {index === 0 && (
                     <Typography align='center' variant='h4' component='h1'>
                        Breakfast
                     </Typography>
                  )}
                  {index === 1 && (
                     <Typography align='center' variant='h4' component='h1'>
                        Lunch
                     </Typography>
                  )}
                  {index === 2 && (
                     <Typography align='center' variant='h4' component='h1'>
                        Dinner
                     </Typography>
                  )}
                  <div className='mealplan-item-row'>
                     {/* <div className='mealplan-item-card'> */}
                     <FoodItemContents
                        route={'recipes'}
                        id={mealplanItem.id}
                        image={mealplanItem.image}
                        title={mealplanItem.title}
                        nutrition={mealplanItem.nutrition}
                        url={mealplanItem.sourceUrl}
                        isMealPlanItem={true}
                        servings={sampleMealplanItems[index].servings}
                     />
                     {/* </div> */}
                  </div>
               </div>
            ))}
         </div>
      </>
   );
};
