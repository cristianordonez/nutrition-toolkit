import React, { ReactElement, ReactNode } from 'react';
import './SampleFeatureSidebars.scss';
import { Drawer, Toolbar, IconButton, Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useLocation } from 'react-router-dom';
import { SearchFormCustom } from '../../../components/search-forms/SearchFormCustom';
import { SampleMealplanSidebarContents } from './SampleMealplanSidebarContents';
import { SampleCalculatorSidebarContents } from './SampleCalculatorSidebarContents';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { MainTitleLogo } from '../../../components/main-title-logo';

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
                  pt: '1rem',
                  pl: '1rem',
                  pr: '1rem',
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
            {/* <MainTitleLogo /> */}

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
                  pt: '1rem',
                  pl: '1rem',
                  pr: '1rem',
               },
            }}
         >
            <MainTitleLogo />
            <Box sx={{pt: '1rem'}}>
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
            </Box>
         </Drawer>
      </>
   );
};
