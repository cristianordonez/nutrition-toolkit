import React, { FormEventHandler, useState } from 'react';
import { Drawer, Toolbar, IconButton, SelectChangeEvent } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { SearchFormCustom } from '../../../../components/search-forms/SearchFormCustom';
import { RouteValues } from '../../SampleAppFeaturesPage';

const drawerWidth = 350;

interface Props {
   handleDrawerToggle: () => void;
   mobileOpen: boolean;
   route: string;
   values: RouteValues;
   handleRouteChange: (event: SelectChangeEvent) => void;
   handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   handleTypeSelect: (event: SelectChangeEvent) => void;
   handleSubmit: FormEventHandler<HTMLFormElement>;
}

export const SampleRecipeSideBar = ({
   handleDrawerToggle,
   mobileOpen,
   route,
   values,
   handleRouteChange,
   handleInputChange,
   handleTypeSelect,
   handleSubmit,
}: Props) => {
   return (
      <>
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
            {/* MOBILE */}
            <SearchFormCustom
               route={route}
               values={values}
               handleSubmit={handleSubmit}
               handleRouteChange={handleRouteChange}
               handleInputChange={handleInputChange}
               handleTypeSelect={handleTypeSelect}
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
            <SearchFormCustom
               route={route}
               values={values}
               handleSubmit={handleSubmit}
               handleRouteChange={handleRouteChange}
               handleInputChange={handleInputChange}
               handleTypeSelect={handleTypeSelect}
            />
         </Drawer>
      </>
   );
};
