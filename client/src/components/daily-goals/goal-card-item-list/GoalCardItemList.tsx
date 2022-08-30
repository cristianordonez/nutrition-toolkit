import React, { Dispatch, SetStateAction } from 'react';
import { CurrentGoals } from '../../../../../types/types';
import { BsEggFried } from 'react-icons/bs';
import { GiAvocado } from 'react-icons/gi';
import { FaBreadSlice } from 'react-icons/fa';
import { GoalCardItemCard } from '../goal-card-item-card/GoalCardItemCard';

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
            IconSvg={FaBreadSlice}
            nutrientsTotal={goals.total_carbohydrates}
            page={page}
            setGoals={setGoals}
            goals={goals}
         />
         <GoalCardItemCard
            nutrientsTotal={goals.total_protein}
            IconSvg={BsEggFried}
            type={'Protein'}
            page={page}
            setGoals={setGoals}
            goals={goals}
         />
         <GoalCardItemCard
            nutrientsTotal={goals.total_fat}
            IconSvg={GiAvocado}
            type={'Fat'}
            page={page}
            setGoals={setGoals}
            goals={goals}
         />
      </>
   );
};
