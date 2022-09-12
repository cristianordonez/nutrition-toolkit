//shared sidebar
import React, { ReactNode } from 'react';
import { DailyGoals } from '../daily-goals';
import { IconButton, Toolbar, Drawer, Stack } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CurrentGoals, MealplanItemType } from '../../../../types/types';
import { MainTitleLogo } from '../main-title-logo/index';

interface Props {
   mobileOpen: boolean | undefined;
   handleDrawerToggle: any;
   SearchFormComponent?: ReactNode;
   apiData?: MealplanItemType[];
   goals?: CurrentGoals | any;
   page: string;
   nutritionSummary?: any;
   mealplanItemsFound?: boolean;
}

const drawerWidth = 350;

export const SideBar = ({
   mobileOpen,
   handleDrawerToggle,
   SearchFormComponent,
   apiData,
   goals,
   page,
   nutritionSummary,
   mealplanItemsFound,
}: Props) => {
   return (
      <>
         {/* MOBILE */}
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
               <Stack
                  sx={{ width: '100%', pb: '5rem' }}
                  direction='row'
                  spacing={2}
                  justifyContent={'center'}
                  alignItems='center'
               >
                  <MainTitleLogo />
               </Stack>
               {page === 'search' && apiData !== undefined && apiData.length
                  ? SearchFormComponent
                  : null}
               {page === 'search' && apiData === undefined}{' '}
               {<DailyGoals goals={goals} page={'search'} />}
               {page === 'mealplan' && nutritionSummary === true ? (
                  <DailyGoals
                     goals={goals}
                     nutritionSummary={nutritionSummary}
                     page={'mealplan'}
                  />
               ) : null}
            </Drawer>

            {/* DESKTOP */}
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
                  },
               }}
            >
               <Stack
                  sx={{ width: '100%', pb: '5rem' }}
                  direction='row'
                  spacing={2}
                  justifyContent={'center'}
                  alignItems='center'
               >
                  <MainTitleLogo />
               </Stack>
               {page === 'search' && apiData !== undefined && apiData.length
                  ? SearchFormComponent
                  : null}
               {page === 'search' &&
               apiData !== undefined &&
               apiData.length === 0 ? (
                  <DailyGoals goals={goals} page={'search'} />
               ) : null}

               {page === 'mealplan' &&
               nutritionSummary !== undefined &&
               nutritionSummary.length > 0 ? (
                  <DailyGoals
                     goals={goals}
                     nutritionSummary={nutritionSummary}
                     page={'mealplan'}
                  />
               ) : null}
               {page === 'mealplan' &&
               nutritionSummary !== undefined &&
               !nutritionSummary.length &&
               !mealplanItemsFound ? (
                  <DailyGoals goals={goals} page={'search'} />
               ) : null}
               {page === 'macrocalculator' ||
               (page === 'user-profile' && !nutritionSummary) ? (
                  <DailyGoals goals={goals} page={'search'} />
               ) : null}
            </Drawer>
         </>
      </>
   );
};
