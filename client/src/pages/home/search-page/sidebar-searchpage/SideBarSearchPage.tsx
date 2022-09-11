import React, { ReactNode } from 'react';
import { SideBar } from '../../../../components/sidebar/SideBar';
import { CurrentGoals } from '../../../../../../types/types';

interface SearchPageSidebarProps {
   mobileOpen: boolean | undefined;
   handleDrawerToggle: any;
   SearchFormComponent: ReactNode;
   apiData: never[];
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
