import React, { useState, useEffect } from 'react';
import { SideBar } from '../../../components/sidebar/SideBar';
import axios from 'axios';
import { CurrentGoals } from '../../../../../types/types';

interface Props {
   mobileOpen: boolean | undefined;
   handleDrawerToggle: any;
   nutritionSummary: any[];
   mealplanItemsFound: boolean;
}

export const SidebarMealplan = ({
   mobileOpen,
   handleDrawerToggle,
   nutritionSummary,
   mealplanItemsFound,
}: Props) => {
   const [goals, setGoals] = useState<CurrentGoals>();

   //get the users nutrient goals at initial render
   useEffect(() => {
      getGoals();
   }, []);

   const getGoals = async () => {
      try {
         let currentGoals = await axios.get('/api/metrics');
         setGoals(currentGoals.data);
      } catch (err) {
         console.log(err);
      }
   };

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
