import React, { MouseEventHandler } from 'react';
import { IconButton, Toolbar, Drawer, Typography } from '@mui/material';
import { SampleMealplanSidebarContents } from './SampleMealplanSidebarContents';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { GoalCardItemLinearProgress } from '../../../../components/goal-card-item-linear-progress/GoalCardItemLinearProgress';
import { CaloriesCircularProgress } from '../../../../components/calories-circular-progress/CaloriesCircularProgress';
import { CurrentGoals } from '../../../../../../types/types';

const drawerWidth = 350;

interface Props {
   mobileOpen: boolean;
   handleDrawerToggle: any;
   nutritionSummary: {
      calories: number;
      carbohydrates: number;
      fat: number;
      protein: number;
   };
   goals: CurrentGoals;
}

export const SampleMealplanSidebar = ({
   handleDrawerToggle,
   mobileOpen,
   nutritionSummary,
   goals,
}: Props) => {
   let calories = Math.floor(
      (nutritionSummary.calories / goals.total_calories) * 100
   );
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
            <SampleMealplanSidebarContents
               goals={goals}
               nutritionSummary={nutritionSummary}
            />
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
            <SampleMealplanSidebarContents
               goals={goals}
               nutritionSummary={nutritionSummary}
            />
         </Drawer>
      </>
   );
};
