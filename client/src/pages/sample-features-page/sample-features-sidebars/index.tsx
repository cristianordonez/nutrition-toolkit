import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Drawer, IconButton, Toolbar } from '@mui/material';
import React, { FormEventHandler, MouseEventHandler } from 'react';
import {
   CurrentGoals,
   NutritionSummaryFoodLog,
   Query,
} from '../../../../../types/types';
import { MainTitleLogo } from '../../../components/main-title-logo';
import { AdvancedSearchForm } from '../../../components/search-forms/AdvancedSearchForm';
import { SampleCalculatorSidebarContents } from './SampleCalculatorSidebarContents';
import './SampleFeatureSidebars.scss';
import { SampleFoodLogSidebarContents } from './SampleFoodLogSidebarContents';
const drawerWidth = '350px';

interface Props {
   handleDrawerToggle: () => void;
   mobileOpen: boolean;
   values: Query;
   handleSearch: FormEventHandler<HTMLFormElement>;
   handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   goals: CurrentGoals;
   nutritionSummary: NutritionSummaryFoodLog;
   view: 'foodLog' | 'search' | 'calculator';
   handleRadioClick: MouseEventHandler<HTMLButtonElement>;
}

export const SampleFeaturesSidebar = ({
   mobileOpen,
   handleDrawerToggle,
   values,
   handleSearch,
   handleInputChange,
   goals,
   nutritionSummary,
   view,
   handleRadioClick,
}: Props): ReactJSXElement => {
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
               <AdvancedSearchForm
                  values={values}
                  handleSubmit={handleSearch}
                  handleInputChange={handleInputChange}
                  goals={goals}
                  handleRadioClick={handleRadioClick}
               />
            ) : null}
            {view === 'foodLog' ? (
               <SampleFoodLogSidebarContents
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
                  <AdvancedSearchForm
                     values={values}
                     handleSubmit={handleSearch}
                     handleInputChange={handleInputChange}
                     goals={goals}
                     handleRadioClick={handleRadioClick}
                  />
               ) : null}
               {view === 'foodLog' ? (
                  <SampleFoodLogSidebarContents
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
