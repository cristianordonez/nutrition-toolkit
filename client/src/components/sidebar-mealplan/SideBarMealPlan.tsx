import React, { useState, useEffect } from 'react';
import { SideBar } from '../shared/sidebar/SideBar';
import axios from 'axios';
import { CurrentGoals } from '../sidebar-searchpage/SideBarSearchPage';

interface Props {
   mobileOpen: boolean | undefined;
   handleDrawerToggle: any;
   page: string;
   nutritionSummary: any[];
   mealplanItems: [];
   mealplanItemsFound: boolean;
}

export const SidebarMealplan = ({
   mobileOpen,
   handleDrawerToggle,
   page,
   nutritionSummary,
   mealplanItems,
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
         console.log('err in sidebarmealplan:', err);
      }
   };

   return (
      <>
         {goals !== undefined && Object.keys(goals).length && (
            <SideBar
               mobileOpen={mobileOpen}
               handleDrawerToggle={handleDrawerToggle}
               page={page}
               nutritionSummary={nutritionSummary}
               goals={goals}
               mealplanItemsFound={mealplanItemsFound}
            />
         )}
      </>
   );
};
