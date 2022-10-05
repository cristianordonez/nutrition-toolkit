import { Typography } from '@mui/material';
import React from 'react';
import {
   CurrentGoals,
   NutritionSummaryMealplan,
} from '../../../../../types/types';
import { CaloriesCircularProgress } from '../../calories-circular-progress/CaloriesCircularProgress';
import { GoalCardItemLinearProgress } from '../../goal-card-item-linear-progress/GoalCardItemLinearProgress';
import '../DailyGoals.scss';

interface Props {
   nutritionSummary: NutritionSummaryMealplan;
   goals: CurrentGoals;
}
export const DailyGoalsMealplan = ({ nutritionSummary, goals }: Props) => {
   return (
      <div className='daily-goals'>
         <Typography variant='h6'>Today's Macronutrient Totals</Typography>
         {nutritionSummary.total_calories !== undefined ? (
            <>
               <CaloriesCircularProgress
                  calories={parseInt(nutritionSummary.total_calories)}
                  goalCalories={goals.total_calories}
               />
               <div
                  className='daily-goals-items'
                  data-testid='mealplan-goal-items'
               >
                  <GoalCardItemLinearProgress
                     type={'Carbohydrates'}
                     nutrientsInMealPlan={parseInt(
                        nutritionSummary.total_carbohydrates
                     )}
                     nutrientsTotal={goals.total_carbohydrates}
                  />
                  <GoalCardItemLinearProgress
                     nutrientsInMealPlan={parseInt(
                        nutritionSummary.total_protein
                     )}
                     nutrientsTotal={goals.total_protein}
                     type={'Protein'}
                  />
                  <GoalCardItemLinearProgress
                     nutrientsTotal={goals.total_fat}
                     type={'Fat'}
                     nutrientsInMealPlan={parseInt(nutritionSummary.total_fat)}
                  />
               </div>
            </>
         ) : null}
      </div>
   );
};
