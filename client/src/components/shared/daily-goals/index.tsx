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

export const DailyGoals = ({ goals, nutritionSummary, page }: Props) => {
   let nutrients = ['Carbohydrates', 'Protein', 'Fat'];

   //! conditional renders return a '0' on page when falsy, need to declare null to be rendered

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

   return (
      <>
         <div className='daily-goals'>
            {/* DIFFERENT TITLES FOR SEARCH AND MEALPLAN */}
            {page === 'mealplan' ? (
               <Typography variant='h6'>
                  Today's Macronutrient Totals
               </Typography>
            ) : (
               <Typography variant='h6'>Your Macronutrient Goals</Typography>
            )}
            {/* RENDER THE MEALPLAN SIDEBAR HERE */}
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
                     <Typography variant='body1'>Calories</Typography>

                     <Typography variant='body1'>
                        <em>
                           {Math.floor(nutritionSummary[5].amount)} /{' '}
                           {goals.total_calories}
                        </em>
                     </Typography>
                  </div>
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
               </>
            ) : null}
            {/* RENDER THE SEARCH SIDEBAR HERE */}
            {page === 'search' ? (
               <>
                  <CircularProgress
                     variant='determinate'
                     size={200}
                     value={100}
                     thickness={1}
                  />
                  <div className='daily-goals-heading'>
                     <Typography variant='body1'>Total Calories</Typography>

                     <>
                        <Typography variant='body1'>
                           <em>{goals.total_calories}</em>
                        </Typography>
                     </>
                  </div>
                  <div className='daily-goals-items'>
                     <GoalCardItem
                        type={'Carbohydrates'}
                        nutrientsTotal={goals.total_carbohydrates}
                     />
                     <GoalCardItem
                        nutrientsTotal={goals.total_protein}
                        type={'Protein'}
                     />
                     <GoalCardItem
                        nutrientsTotal={goals.total_fat}
                        type={'Fat'}
                     />
                  </div>
               </>
            ) : null}
         </div>
      </>
   );
};
