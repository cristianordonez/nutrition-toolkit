import { Typography } from '@mui/material';
import React from 'react';
import { CurrentGoals } from '../../../../../types/types';
import { CaloriesCircularProgressWithoutGoals } from '../../calories-circular-progress/CaloriesCircularProgressWithoutGoals';
import { GoalCardItemList } from '../../goal-card-item-list/GoalCardItemList';
import '../DailyGoals.scss';

interface Props {
   goals: CurrentGoals;
   handleSubmitUpdatedGoals?: (event: React.FormEvent) => Promise<void>;
}

export const DailyGoals = ({ goals, handleSubmitUpdatedGoals }: Props) => {
   return (
      <>
         <div className='daily-goals'>
            <Typography variant='h6'>Your Daily Macronutrient Goals</Typography>
            {goals !== undefined ? (
               <>
                  <CaloriesCircularProgressWithoutGoals goals={goals} />
                  <form
                     onSubmit={handleSubmitUpdatedGoals}
                     className='daily-goals-items'
                  >
                     <GoalCardItemList goals={goals} />
                  </form>
               </>
            ) : null}
         </div>
      </>
   );
};
