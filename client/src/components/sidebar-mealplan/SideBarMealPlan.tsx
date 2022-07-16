import React, { useState, useEffect } from 'react';
import { SideBar } from '../shared/sidebar/SideBar';
import axios from 'axios';
import { CurrentGoals } from '../sidebar-searchpage/SideBarSearchPage';

interface Props {
   mobileOpen: boolean | undefined;
   handleDrawerToggle: any;
   page: string;
   nutritionSummary: any[];
}

export const SidebarMealplan = ({
   mobileOpen,
   handleDrawerToggle,
   page,
   nutritionSummary,
}: Props) => {
   console.log(nutritionSummary);

   const [goals, setGoals] = useState<CurrentGoals>();

   useEffect(() => {
      getGoals();
   }, []);

   const getGoals = async () => {
      try {
         let currentGoals = await axios.get('/api/metrics');
         console.log('currentgoals:', currentGoals);
         setGoals(currentGoals.data);
         console.log(goals);
      } catch (err) {
         console.log('err in sidebarmealplan:', err);
         //  return;
      }
   };

   return (
      <>
       {goals !== undefined && Object.keys(goals).length &&
         <SideBar
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            page={page}
            nutritionSummary={nutritionSummary}
            goals={goals}
         />}
      </>
   );
};
