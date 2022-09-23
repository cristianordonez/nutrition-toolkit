import { Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { CurrentGoals, MealplanItemType } from '../../../../../../types/types';
import { SideBar } from '../../../../components/sidebar/SideBar';

interface SearchPageSidebarProps {
   mobileOpen: boolean | undefined;
   handleDrawerToggle: any;
   SearchFormComponent: ReactNode;
   apiData: MealplanItemType[];
   goals: CurrentGoals;
   route: string;
}

export const SideBarSearchPage = ({
   mobileOpen,
   handleDrawerToggle,
   SearchFormComponent,
   apiData,
   goals,
   route,
}: SearchPageSidebarProps) => {
   return (
      <>
         <SideBar
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            SearchFormComponent={SearchFormComponent}
            apiData={apiData}
            goals={goals}
            page={'search'}
         />
      </>
   );
};
