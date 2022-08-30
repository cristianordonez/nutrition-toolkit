//shared sidebar
import React, { ReactNode } from 'react';
import { DailyGoals } from '../daily-goals';
import { IconButton, Toolbar, Drawer } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CurrentGoals } from '../../../../types/types';

interface Props {
   mobileOpen: boolean | undefined;
   handleDrawerToggle: any;
   SearchFormComponent?: ReactNode;
   apiData?: never[];
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
         {/* IF PAGE IS SEARCH, RENDER THIS PART */}
         {page === 'search' && (
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
                  {apiData !== undefined && apiData.length ? (
                     SearchFormComponent
                  ) : (
                     <DailyGoals goals={goals} page={'search'} />
                  )}
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
                  {apiData !== undefined && apiData.length ? (
                     SearchFormComponent
                  ) : (
                     <DailyGoals goals={goals} page={'search'} />
                  )}
               </Drawer>
            </>
         )}
         {/* IF PAGE IS MEALPLAN, RENDER EVERYTHING BELOW */}
         {page === 'mealplan' && goals !== undefined && (
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
                  {nutritionSummary ? (
                     <DailyGoals
                        goals={goals}
                        nutritionSummary={nutritionSummary}
                        page={'mealplan'}
                     />
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
                  {nutritionSummary.length ? (
                     <DailyGoals
                        goals={goals}
                        nutritionSummary={nutritionSummary}
                        page={'mealplan'}
                     />
                  ) : null}
                  {!nutritionSummary.length && !mealplanItemsFound ? (
                     <DailyGoals goals={goals} page={'search'} />
                  ) : null}
               </Drawer>
            </>
         )}
      </>
   );
};
