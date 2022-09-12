import React, { Dispatch, SetStateAction, useState } from 'react';
import './index.scss';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import { Stack, Tabs, Tab, Typography, AlertColor } from '@mui/material';
import { SearchFormSuggested } from '../../../../components/search-forms/SearchFormSuggested';
import { SearchFormCustom } from '../../../../components/search-forms/SearchFormCustom';
import { SelectChangeEvent } from '@mui/material/Select';
import { CurrentGoals, MealplanItemType, ValuesType } from '../../../../../../types/types';

interface Props {
   handleSubmit: (event: React.SyntheticEvent) => Promise<void>
   route: string;
   setRoute: Dispatch<SetStateAction<string>>;
   setCurrentTab: Dispatch<SetStateAction<string>>;
   currentTab: string;
   handleChange: (event: React.SyntheticEvent, currentValue: string) => void
   values:   ValuesType;
   setValues: Dispatch<SetStateAction<ValuesType>>;
   goals: CurrentGoals;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setLoading: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setShowLoadMoreBtn: Dispatch<SetStateAction<boolean>>;
   setAPIData: Dispatch<SetStateAction<MealplanItemType[]>>;
}

export const SearchForm = ({
   handleSubmit,
   route,
   setRoute,
   setCurrentTab,
   currentTab,
   handleChange,
   values,
   setValues,
   goals,
   setAlertMessage,
   setAlertSeverity,
   setLoading,
   setOpenAlert,
   setShowLoadMoreBtn,
   setAPIData,
}: Props) => {
   const handleRouteChange = (event: SelectChangeEvent) => {
      setRoute(event.target.value);
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [event.target.id]: event.target.value });
   };

   const handleTypeSelect = (event: SelectChangeEvent) => {
      setValues({ ...values, type: event.target.value });
   };
   return (
      <div className='search-form'>
         <Stack direction='row' spacing={1}>
            <ScreenSearchDesktopIcon />
            <Typography variant='body1'>
               Find recipes, grocery products, or menu items from over 800+
               restaurants that match your nutrient goals
            </Typography>
         </Stack>
         <Tabs
            value={currentTab}
            onChange={handleChange}
            aria-label='toggle suggested search'
            className='search-form-tabs'
            indicatorColor='secondary'
            textColor='secondary'
         >
            <Tab value='custom-search' label='Custom' />
            <Tab value='suggested-goals' label='Suggested' />
         </Tabs>

         {currentTab === 'custom-search' ? (
            <SearchFormCustom
               route={route}
               values={values}
               handleSubmit={handleSubmit}
               handleRouteChange={handleRouteChange}
               handleInputChange={handleInputChange}
               handleTypeSelect={handleTypeSelect}
            />
         ) : (
            <SearchFormSuggested
               route={route}
               values={values}
               handleRouteChange={handleRouteChange}
               handleInputChange={handleInputChange}
               handleTypeSelect={handleTypeSelect}
               goals={goals}
               setValues={setValues}
               setAlertMessage={setAlertMessage}
               setAlertSeverity={setAlertSeverity}
               setLoading={setLoading}
               setOpenAlert={setOpenAlert}
               setShowLoadMoreBtn={setShowLoadMoreBtn}
               setAPIData={setAPIData}
            />
         )}
      </div>
   );
};
