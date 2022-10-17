import { Button, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { CurrentGoals } from '../../../../../types/types';
import { CaloriesCircularProgressWithoutGoals } from '../../calories-circular-progress/CaloriesCircularProgressWithoutGoals';
import { GoalCardItemListWithInput } from '../../goal-card-item-list/GoalCardItemListWithInput';
import '../DailyGoals.scss';

interface Props {
   goals: CurrentGoals;
   setGoals: Dispatch<SetStateAction<CurrentGoals>>;
   handleSubmitUpdatedGoals?: (event: React.FormEvent) => Promise<void>;
}
export const DailyGoalsUserProfile = ({
   goals,
   setGoals,
   handleSubmitUpdatedGoals,
}: Props) => {
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
                     <GoalCardItemListWithInput
                        goals={goals}
                        setGoals={setGoals}
                     />
                     <Button variant='contained' fullWidth type='submit'>
                        Save Changes
                     </Button>
                  </form>
               </>
            ) : null}
         </div>
      </>
   );
};
