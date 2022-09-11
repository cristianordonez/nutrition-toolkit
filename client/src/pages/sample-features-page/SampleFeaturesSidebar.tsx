import React from 'react';
import { Drawer, Toolbar, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useLocation } from 'react-router-dom';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
const drawerWidth = '350px';

interface Props {
   handleDrawerToggle: () => void;
   mobileOpen: boolean;
   SearchFormCustomComponent: JSX.Element;
   SampleMealplanSidebarContentsComponent: JSX.Element;
}

export const SampleFeaturesSidebar = ({
   handleDrawerToggle,
   mobileOpen,
   SearchFormCustomComponent,
   SampleMealplanSidebarContentsComponent,
}: Props) => {
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

            {location.pathname === '/diabetes-calculator-features/mealplan' ? (
               <SampleMealplanSidebarContentsComponent />
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
            {location.pathname === '/diabetes-calculator-features/mealplan' ? (
               <SampleMealplanSidebarContentsComponent />
            ) : null}
         </Drawer>
      </>
   );
};
