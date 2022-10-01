import React from 'react';
import { CurrentGoals } from '../../../../../../types/types';
import { SideBar } from '../../../../components/sidebar/SideBar';

interface Props {
   mobileOpen: boolean | undefined;
   handleDrawerToggle: any;
   nutritionSummary: any[];
   mealplanItemsFound: boolean;
   goals: CurrentGoals;
}

export const SidebarMealplan = ({
   mobileOpen,
   handleDrawerToggle,
   nutritionSummary,
   mealplanItemsFound,
   goals,
}: Props) => {
   return (
      <>
         {goals !== undefined && Object.keys(goals).length ? (
            <SideBar
               mobileOpen={mobileOpen}
               handleDrawerToggle={handleDrawerToggle}
               page='mealplan'
               nutritionSummary={nutritionSummary}
               goals={goals}
               mealplanItemsFound={mealplanItemsFound}
            />
         ) : null}
      </>
   );
};
