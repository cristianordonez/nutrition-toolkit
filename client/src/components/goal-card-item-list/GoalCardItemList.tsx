import React, { Dispatch, SetStateAction } from 'react';
import { CurrentGoals } from '../../../../types/types';
import { GoalCardItemCard } from './goal-card-item-card/GoalCardItemCard';

interface Props {
   goals: CurrentGoals;
   page: 'search' | 'user-profile' | 'mealplan';
   setGoals?: Dispatch<SetStateAction<CurrentGoals>>;
}

export const GoalCardItemList = ({ goals, page, setGoals }: Props) => {
   return (
      <>
         <GoalCardItemCard
            type={'Carbohydrates'}
            nutrientsTotal={goals.total_carbohydrates}
            page={page}
            setGoals={setGoals}
            goals={goals}
         />
         <GoalCardItemCard
            nutrientsTotal={goals.total_protein}
            type={'Protein'}
            page={page}
            setGoals={setGoals}
            goals={goals}
         />
         <GoalCardItemCard
            nutrientsTotal={goals.total_fat}
            type={'Fat'}
            page={page}
            setGoals={setGoals}
            goals={goals}
         />
      </>
   );
};
