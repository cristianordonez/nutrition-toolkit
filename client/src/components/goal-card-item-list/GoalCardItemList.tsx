import React, { Dispatch, SetStateAction } from 'react';
import { CurrentGoals } from '../../../../types/types';
import { GoalCardItemCard } from './goal-card-item-card/GoalCardItemCard';
import { AvocadoSvgComponent } from './goal-card-item-card/svg-components/AvocadoSvgComponent';
import { BreadSvgComponent } from './goal-card-item-card/svg-components/BreadSvgComponent';
import { ChickenSvgComponent } from './goal-card-item-card/svg-components/ChickenSvgComponent';
interface Props {
   goals: CurrentGoals;
   setGoals?: Dispatch<SetStateAction<CurrentGoals>>;
}

export const GoalCardItemList = ({ goals, setGoals }: Props) => {
   return (
      <>
         <GoalCardItemCard
            type={'Carbohydrates'}
            nutrientsTotal={goals.total_carbohydrates}
            Icon={BreadSvgComponent}
         />
         <GoalCardItemCard
            nutrientsTotal={goals.total_protein}
            type={'Protein'}
            Icon={ChickenSvgComponent}
         />
         <GoalCardItemCard
            nutrientsTotal={goals.total_fat}
            type={'Fat'}
            Icon={AvocadoSvgComponent}
         />
      </>
   );
};
