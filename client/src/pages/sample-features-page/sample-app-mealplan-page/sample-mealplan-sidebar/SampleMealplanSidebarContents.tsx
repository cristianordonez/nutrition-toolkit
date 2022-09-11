import React from 'react';
import { Typography, Stack } from '@mui/material';
import { GoalCardItemLinearProgress } from '../../../../components/goal-card-item-linear-progress/GoalCardItemLinearProgress';
import { CaloriesCircularProgress } from '../../../../components/calories-circular-progress/CaloriesCircularProgress';
import { CurrentGoals } from '../../../../../../types/types';

const drawerWidth = 350;

interface Props {
   nutritionSummary: {
      calories: number;
      carbohydrates: number;
      fat: number;
      protein: number;
   };
   goals: CurrentGoals;
}

export const SampleMealplanSidebarContents = ({
   nutritionSummary,
   goals,
}: Props) => {
   let calories = Math.floor(
      (nutritionSummary.calories / goals.total_calories) * 100
   );
   return (
      <>
         <Typography variant='h4' component='h1' align='center'>
            Today's Goals
         </Typography>
         <CaloriesCircularProgress
            calories={calories}
            caloriesUsed={Math.floor(nutritionSummary.calories)}
            caloriesTotal={goals.total_calories}
         />
         <Stack direction='column' spacing={2} sx={{ p: '1rem' }}>
            <GoalCardItemLinearProgress
               nutrientsTotal={goals.total_carbohydrates}
               type={'Carbohydrates'}
               nutrientsInMealPlan={nutritionSummary.carbohydrates}
            />
            <GoalCardItemLinearProgress
               nutrientsTotal={goals.total_protein}
               type={'Protein'}
               nutrientsInMealPlan={nutritionSummary.protein}
            />
            <GoalCardItemLinearProgress
               nutrientsTotal={goals.total_fat}
               type={'Fat'}
               nutrientsInMealPlan={nutritionSummary.fat}
            />
            <Typography variant='caption' align='center' sx={{ pt: '5rem' }}>
               Note: goals and mealplan items are generated randomly. Please log
               in or create an account to search and save items to your meal
               plan.
            </Typography>
         </Stack>
      </>
   );
};
