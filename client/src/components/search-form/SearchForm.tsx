import React, { useState } from 'react';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import { Stack, Tabs, Tab, Typography } from '@mui/material';
import SearchFormSuggested from './search-form-suggested/SearchFormSuggested';
import SearchFormCustom from './search-form-custom/SearchFormCustom';

export const SearchForm = ({
   handleSubmit,
   route,
   setRoute,
   setCurrentTab,
   currentTab,
   handleChange,
   values,
   setValues,
}: any) => {
   return (
      <>
         <Stack direction='row' spacing={1}>
            <ScreenSearchDesktopIcon />
            <Typography variant='h4' component='h1'>
               Search
            </Typography>
         </Stack>
         <Tabs
            value={currentTab}
            onChange={handleChange}
            aria-label='switch between custom and suggested search'
         >
            <Tab value='custom-search' label='Custom Search' />
            <Tab value='suggested-goals' label='Suggested Goals' />
         </Tabs>

         {currentTab === 'custom-search' ? (
            <SearchFormCustom
               route={route}
               setRoute={setRoute}
               values={values}
               setValues={setValues}
               handleSubmit={handleSubmit}
            />
         ) : (
            <SearchFormSuggested />
         )}
      </>
   );
};
