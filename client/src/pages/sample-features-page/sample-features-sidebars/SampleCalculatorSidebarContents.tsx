import { Typography } from '@mui/material';
import React from 'react';
import { CurrentGoals } from '../../../../../types/types';
import { CaloriesCircularProgressWithoutGoals } from '../../../components/calories-circular-progress/CaloriesCircularProgressWithoutGoals';
import { GoalCardItemList } from '../../../components/goal-card-item-list/GoalCardItemList';

interface Props {
   goals: CurrentGoals;
}

export const SampleCalculatorSidebarContents = ({ goals }: Props) => {
   return (
      <>
         <>
            <Typography variant='h4' component='h1' align='center'>
               Recommended Daily Goals
            </Typography>
            <CaloriesCircularProgressWithoutGoals goals={goals} />
            <div className='goal-card-items'>
               <GoalCardItemList goals={goals} />
            </div>
         </>
      </>
   );
};
