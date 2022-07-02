import React from 'react';
import './Sidebar.scss';
import { DailyGoals } from '../daily-goals';
import { IconButton, Toolbar, Drawer } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const Sidebar = ({
   mobileOpen,
   handleDrawerToggle,
   searchForm,
   apiData,
   goals,
}: any) => {
   const drawerWidth = 350;
   return (
      <>
         {/* MOBILE */}
         <Drawer
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
               keepMounted: true, // Better open performance on mobile.
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
            {apiData.length ? searchForm : <DailyGoals goals={goals} />}
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
                  pt: '100px',
               },
            }}
         >
            {apiData.length ? searchForm : <DailyGoals goals={goals} />}
         </Drawer>
      </>
   );
};
