import React, { ReactNode } from 'react';
import { SideBar } from '../../../../components/sidebar/SideBar';
import { CurrentGoals, MealplanItemType } from '../../../../../../types/types';

interface SearchPageSidebarProps {
   mobileOpen: boolean | undefined;
   handleDrawerToggle: any;
   SearchFormComponent: ReactNode;
   apiData: MealplanItemType[];
   goals: CurrentGoals;
}

export const SideBarSearchPage = ({
   mobileOpen,
   handleDrawerToggle,
   SearchFormComponent,
   apiData,
   goals,
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
