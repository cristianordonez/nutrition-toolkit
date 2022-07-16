//! this is mealplan sidebar
import React from 'react';
import { SideBar } from '../shared/SideBar';

interface Props {
   mobileOpen: boolean | undefined;
   handleDrawerToggle: any;
   page: string;
}

export const SidebarMealplan = ({
   mobileOpen,
   handleDrawerToggle,
   page,
}: Props) => {
   return (
      <>
         <SideBar
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            page={page}
         />
      </>
   );
};
