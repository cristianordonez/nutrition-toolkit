import React from 'react';
import './index.scss';
import { Typography, CircularProgress } from '@mui/material';
import { GoalCardItem } from './GoalCardItem';

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
   nutritionSummary?: any[];
}

//todo fix this component so that it shows progress bar, and differs based on search page or mealplan page
export const DailyGoals = ({ goals, nutritionSummary }: Props) => {
   let nutrients = ['Carbohydrates', 'Protein', 'Fat'];
   console.log('goals in dailygoals:', goals);
   return (
      <div className='daily-goals'>
         <Typography variant='h6'>Daily Macronutrient Goals</Typography>
         <CircularProgress
            variant='determinate'
            size={200}
            value={100}
            thickness={1}
         />
         <div className='daily-goals-heading'>
            <Typography variant='body1'>Total</Typography>
            <Typography variant='body1'>
               <em>{goals.total_calories}</em>
            </Typography>
            <Typography variant='body1'>Calories</Typography>
         </div>
         <div className='daily-goals-items'>
            <GoalCardItem
               count={goals.total_carbohydrates}
               type={'Carbohydrates'}
            />
            <GoalCardItem count={goals.total_protein} type={'Protein'} />
            <GoalCardItem count={goals.total_fat} type={'Fat'} />
         </div>
      </div>
   );
};
