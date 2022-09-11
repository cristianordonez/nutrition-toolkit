import React, { ReactElement, ReactNode } from 'react';
import { Drawer, Toolbar, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useLocation } from 'react-router-dom';
import { SearchFormCustom } from '../../components/search-forms/SearchFormCustom';
import { SampleMealplanSidebarContents } from './sample-app-mealplan-page/sample-mealplan-sidebar/SampleMealplanSidebarContents';
import { SampleCalculatorSidebarContents } from './sample-app-calculator-page/SampleCalculatorSidebarContentx';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

const drawerWidth = '350px';

interface Props {
   handleDrawerToggle: () => void;
   mobileOpen: boolean;
   route: any;
   values: any;
   handleSearch: any;
   handleRouteChange: any;
   handleInputChange: any;
   handleTypeSelect: any;
   goals: any;
   nutritionSummary: any;
}

export const SampleFeaturesSidebar = ({
   mobileOpen,
   handleDrawerToggle,
   route,
   values,
   handleSearch,
   handleRouteChange,
   handleInputChange,
   handleTypeSelect,
   goals,
   nutritionSummary,
}: Props): ReactJSXElement => {
   const location = useLocation();

   return (
      <>
         <Drawer
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
               keepMounted: true,
            }}
            sx={{
               display: { xs: 'block', sm: 'none' },
               '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                  pt: '100px',
               },
            }}
         >
            <Toolbar>
               <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  edge='start'
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
               >
                  <ArrowBackIosIcon />
               </IconButton>
            </Toolbar>

            {location.pathname === '/diabetes-calculator-features/recipes' ? (
               <SearchFormCustom
                  route={route}
                  values={values}
                  handleSubmit={handleSearch}
                  handleRouteChange={handleRouteChange}
                  handleInputChange={handleInputChange}
                  handleTypeSelect={handleTypeSelect}
               />
            ) : null}
            {location.pathname === '/diabetes-calculator-features/mealplan' ? (
               <SampleMealplanSidebarContents
                  goals={goals}
                  nutritionSummary={nutritionSummary}
               />
            ) : null}
            {location.pathname ===
            '/diabetes-calculator-features/calculator' ? (
               <SampleCalculatorSidebarContents goals={goals} />
            ) : null}
         </Drawer>

         <Drawer
            open
            variant='permanent'
            ModalProps={{ keepMounted: true }}
            sx={{
               display: { xs: 'none', sm: 'block' },
               '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                  pt: '100px',
               },
            }}
         >
            {location.pathname === '/diabetes-calculator-features/recipes' ? (
               <SearchFormCustom
                  route={route}
                  values={values}
                  handleSubmit={handleSearch}
                  handleRouteChange={handleRouteChange}
                  handleInputChange={handleInputChange}
                  handleTypeSelect={handleTypeSelect}
               />
            ) : null}
            {location.pathname === '/diabetes-calculator-features/mealplan' ? (
               <SampleMealplanSidebarContents
                  goals={goals}
                  nutritionSummary={nutritionSummary}
               />
            ) : null}
            {location.pathname ===
            '/diabetes-calculator-features/calculator' ? (
               <SampleCalculatorSidebarContents goals={goals} />
            ) : null}
         </Drawer>
      </>
   );
};
