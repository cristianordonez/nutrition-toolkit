import React, { MouseEventHandler } from 'react';
import './SampleMealplanSidebar.scss';
import { IconButton, Toolbar, Drawer } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { GoalCardItemLinearProgress } from '../../../components/goal-card-item-linear-progress/GoalCardItemLinearProgress';
import { CaloriesCircularProgress } from '../../../components/calories-circular-progress/CaloriesCircularProgress';
import { CurrentGoals } from '../../../../../types/types';

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
            <CaloriesCircularProgress
               calories={calories}
               caloriesUsed={Math.floor(nutritionSummary.calories)}
               caloriesTotal={goals.total_calories}
            />
            <GoalCardItemLinearProgress
               nutrientsTotal={5}
               type={'Protein'}
               nutrientsInMealPlan={200}
            />
         </Drawer>
      </>
   );
};
