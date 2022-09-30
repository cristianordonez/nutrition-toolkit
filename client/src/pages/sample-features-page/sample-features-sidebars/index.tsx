import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
   Box,
   Drawer,
   IconButton,
   SelectChangeEvent,
   Toolbar,
} from '@mui/material';
import React, { FormEventHandler } from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentGoals, Query } from '../../../../../types/types';
import { MainTitleLogo } from '../../../components/main-title-logo';
import { SearchFormCustom } from '../../../components/search-forms/SearchFormCustom';
import { SampleCalculatorSidebarContents } from './SampleCalculatorSidebarContents';
import './SampleFeatureSidebars.scss';
import { SampleMealplanSidebarContents } from './SampleMealplanSidebarContents';
const drawerWidth = '350px';

interface Props {
   handleDrawerToggle: () => void;
   mobileOpen: boolean;
   values: Query;
   handleSearch: FormEventHandler<HTMLFormElement>;
   handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   handleTypeSelect: (event: SelectChangeEvent) => void;
   goals: CurrentGoals;
   nutritionSummary: any;
   view: 'mealplan' | 'search' | 'calculator';
}

export const SampleFeaturesSidebar = ({
   mobileOpen,
   handleDrawerToggle,
   values,
   handleSearch,
   handleInputChange,
   handleTypeSelect,
   goals,
   nutritionSummary,
   view,
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

            {view === 'search' ? (
               <SearchFormCustom
                  values={values}
                  handleSubmit={handleSearch}
                  handleInputChange={handleInputChange}
                  handleTypeSelect={handleTypeSelect}
                  goals={goals}
               />
            ) : null}
            {view === 'mealplan' ? (
               <SampleMealplanSidebarContents
                  goals={goals}
                  nutritionSummary={nutritionSummary}
               />
            ) : null}
            {view === 'calculator' ? (
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
            <Box sx={{ pt: '1rem' }}>
               {view === 'search' ? (
                  <SearchFormCustom
                     values={values}
                     handleSubmit={handleSearch}
                     handleInputChange={handleInputChange}
                     handleTypeSelect={handleTypeSelect}
                     goals={goals}
                  />
               ) : null}
               {view === 'mealplan' ? (
                  <SampleMealplanSidebarContents
                     goals={goals}
                     nutritionSummary={nutritionSummary}
                  />
               ) : null}
               {view === 'calculator' ? (
                  <SampleCalculatorSidebarContents goals={goals} />
               ) : null}
            </Box>
         </Drawer>
      </>
   );
};
