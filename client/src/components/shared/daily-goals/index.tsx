import React, { useState, useEffect } from 'react';
import './index.scss';
import { Typography, CircularProgress } from '@mui/material';
import { GoalCardItem } from './GoalCardItem';

type nutrientType = {
   name: string;
   amount: number;
   percentOfDailyNeeds: number;
   unit: string;
};

export interface Props {
   goals: {
      user_id: number;
      total_carbohydrates: number;
      min_carbs_per_meal: number;
      max_carbs_per_meal: number;
      total_protein: number;
      min_protein_per_meal: number;
      max_protein_per_meal: number;
      total_fat: number;
      min_fat_per_meal: number;
      max_fat_per_meal: number;
      total_calories: number;
      min_calories_per_meal: number;
      max_calories_per_meal: number;
   };
   nutritionSummary?: nutrientType[];
   page?: string;
}

//todo fix this component so that it shows progress bar, and differs based on search page or mealplan page
export const DailyGoals = ({ goals, nutritionSummary, page }: Props) => {
   let nutrients = ['Carbohydrates', 'Protein', 'Fat'];
   console.log('goals in dailygoals:', goals);
   console.log('nutritionSummary: ', nutritionSummary);

   //! conditional renders return a '0' on page when falsy, need to declare null to be rendered

   // console.log(nutritionSummary)
   // useEffect(() => {
   //    const currentCaloriePercentage = Math.floor(getNutrientPercentage(nutritionSummary[5].amount, goals.total_calories ))
   //    console.log('nutrientPercentage: ', currentCaloriePercentage);
   //    setCaloriesPercentage(currentCaloriePercentage);
   // }, [nutritionSummary])

   const getNutrientPercentage = (
      nutrientEaten: number,
      nutrientGoal: number
   ) => {
      return Math.floor((nutrientEaten / nutrientGoal) * 100);
   };

   //IF DATA IS DERIVED FROM PROPS, DECLARE LOCALLY BECAUSE OTHERWISE IT WOULD RENDER TWICE,
   //ONCE ON PROP CHANGE AND THEN ON STATE CHANGE
   let calories;
   if (nutritionSummary !== undefined && nutritionSummary.length) {
      calories = getNutrientPercentage(
         nutritionSummary[5].amount,
         goals.total_calories
      );
   }
   console.log(calories);

   return (
      <>
         <div className='daily-goals'>
            <Typography variant='h6'>Daily Macronutrient Goals</Typography>
            {page === 'mealplan' &&
            nutritionSummary !== undefined &&
            nutritionSummary.length ? (
               <>
                  <CircularProgress
                     variant='determinate'
                     size={200}
                     value={calories}
                     thickness={1}
                  />
                  <div className='daily-goals-heading'>
                     <Typography variant='body1'>Today's Calories</Typography>

                     <Typography variant='body1'>
                        <em>
                           {Math.floor(nutritionSummary[5].amount)} /{' '}
                           {goals.total_calories}
                        </em>
                     </Typography>
                  </div>
               </>
            ) : null}

            {page === 'search' ? (
               <>
                  <CircularProgress
                     variant='determinate'
                     size={200}
                     value={100}
                     thickness={1}
                  />
                  <div className='daily-goals-heading'>
                     <Typography variant='body1'>Today's Calories</Typography>

                     <>
                        <Typography variant='body1'>
                           <em>{goals.total_calories}</em>
                        </Typography>
                     </>
                  </div>
               </>
            ) : null}

            {nutritionSummary !== undefined && nutritionSummary.length ? (
               <div className='daily-goals-items'>
                  <GoalCardItem
                     type={'Carbohydrates'}
                     nutrientsInMealPlan={nutritionSummary[7].amount}
                     nutrientsTotal={goals.total_carbohydrates}
                  />
                  <GoalCardItem
                     nutrientsTotal={goals.total_protein}
                     type={'Protein'}
                     nutrientsInMealPlan={nutritionSummary[28].amount}
                  />
                  <GoalCardItem
                     nutrientsTotal={goals.total_fat}
                     type={'Fat'}
                     nutrientsInMealPlan={nutritionSummary[11].amount}
                  />
               </div>
            ) : null}
         </div>
      </>
   );
};
