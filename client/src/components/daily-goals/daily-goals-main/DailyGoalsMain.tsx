import { Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { CurrentGoals } from '../../../../../types/types';
import { CaloriesCircularProgressWithoutGoals } from '../../calories-circular-progress/CaloriesCircularProgressWithoutGoals';
import { GoalCardItemList } from '../../goal-card-item-list/GoalCardItemList';
import '../DailyGoals.scss';

type nutrientType = {
   name: string;
   amount: number;
   percentOfDailyNeeds: number;
   unit: string;
};

interface Props {
   goals: CurrentGoals;
   nutritionSummary?: nutrientType[];
   setGoals?: Dispatch<SetStateAction<CurrentGoals>>;
   handleSubmitUpdatedGoals?: (event: React.FormEvent) => Promise<void>;
}

export const DailyGoals = ({
   goals,
   nutritionSummary,
   setGoals,
   handleSubmitUpdatedGoals,
}: Props) => {
   const getNutrientPercentage = (
      nutrientEaten: number,
      nutrientGoal: number
   ) => {
      return Math.floor((nutrientEaten / nutrientGoal) * 100);
   };

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
            <Typography variant='h6'>Your Daily Macronutrient Goals</Typography>
            {goals !== undefined ? (
               <>
                  <CaloriesCircularProgressWithoutGoals goals={goals} />
                  <form
                     onSubmit={handleSubmitUpdatedGoals}
                     className='daily-goals-items'
                  >
                     <GoalCardItemList goals={goals} setGoals={setGoals} />
                  </form>
               </>
            ) : null}
         </div>
      </>
   );
};
