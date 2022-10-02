import React, { Dispatch, SetStateAction } from 'react';
import { CurrentGoals } from '../../../../types/types';
import { GoalCardItemCardWithInput } from './goal-card-item-card/GoalCardItemCardWithInput';

interface Props {
   goals: CurrentGoals;
   setGoals?: Dispatch<SetStateAction<CurrentGoals>>;
}

export const GoalCardItemListWithInput = ({ goals, setGoals }: Props) => {
   return (
      <>
         <GoalCardItemCardWithInput
            type={'Carbohydrates'}
            nutrientsTotal={goals.total_carbohydrates}
            setGoals={setGoals}
            goals={goals}
         />
         <GoalCardItemCardWithInput
            nutrientsTotal={goals.total_protein}
            type={'Protein'}
            setGoals={setGoals}
            goals={goals}
         />
         <GoalCardItemCardWithInput
            nutrientsTotal={goals.total_fat}
            type={'Fat'}
            setGoals={setGoals}
            goals={goals}
         />
      </>
   );
};
