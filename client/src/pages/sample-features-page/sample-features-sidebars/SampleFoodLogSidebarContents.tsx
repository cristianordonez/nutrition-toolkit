import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Stack, Typography } from '@mui/material';
import React from 'react';
import {
   CurrentGoals,
   NutritionSummaryFoodLog,
} from '../../../../../types/types';
import { CaloriesCircularProgress } from '../../../components/calories-circular-progress/CaloriesCircularProgress';
import { GoalCardItemLinearProgress } from '../../../components/goal-card-item-linear-progress/GoalCardItemLinearProgress';

interface Props {
   nutritionSummary: NutritionSummaryFoodLog;
   goals: CurrentGoals;
}
export const SampleFoodLogSidebarContents = ({
   nutritionSummary,
   goals,
}: Props): ReactJSXElement => {
   return (
      <React.Fragment>
         <Typography variant='h4' component='h1' align='center'>
            Today's Goals
         </Typography>
         <CaloriesCircularProgress
            calories={parseInt(nutritionSummary.total_calories)}
            goalCalories={goals.total_calories}
         />
         <Stack direction='column' spacing={2} sx={{ p: '1rem' }}>
            <GoalCardItemLinearProgress
               nutrientsTotal={goals.total_carbohydrates}
               type={'Carbohydrates'}
               nutrientsInFoodLog={parseInt(
                  nutritionSummary.total_carbohydrates
               )}
            />
            <GoalCardItemLinearProgress
               nutrientsTotal={goals.total_protein}
               type={'Protein'}
               nutrientsInFoodLog={parseInt(nutritionSummary.total_protein)}
            />
            <GoalCardItemLinearProgress
               nutrientsTotal={goals.total_fat}
               type={'Fat'}
               nutrientsInFoodLog={parseInt(nutritionSummary.total_fat)}
            />
            <Typography variant='caption' align='center' sx={{ pt: '5rem' }}>
               Note: This is a sample food log using our own nutrition goals.
               Please log in or create an account to search and save items to
               your food log.
            </Typography>
         </Stack>
      </React.Fragment>
   );
};
