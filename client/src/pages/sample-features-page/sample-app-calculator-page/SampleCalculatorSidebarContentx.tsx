import React from 'react';
import { CaloriesCircularProgressWithoutGoals } from '../../../components/calories-circular-progress/CaloriesCircularProgressWithoutGoals';
import { GoalCardItemList } from '../../../components/goal-card-item-list/GoalCardItemList';
import { Typography } from '@mui/material';
import { CurrentGoals } from '../../../../../types/types';

interface Props {
   goals: CurrentGoals;
}

export const SampleCalculatorSidebarContents = ({ goals }: Props) => {
   return (
      <>
         <>
            <Typography variant='h3'>Recommended Daily Goals</Typography>
            <CaloriesCircularProgressWithoutGoals goals={goals} />
            <div className='goal-card-items'>
               <GoalCardItemList goals={goals} page={'mealplan'} />
            </div>
         </>
      </>
   );
};
