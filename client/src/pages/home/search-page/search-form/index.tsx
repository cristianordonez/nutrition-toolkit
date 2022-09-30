import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import { AlertColor, Stack, Tab, Tabs, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
   CurrentGoals,
   Query,
   SearchResults,
} from '../../../../../../types/types';
import { SearchFormCustom } from '../../../../components/search-forms/SearchFormCustom';
import { SearchFormSuggested } from '../../../../components/search-forms/SearchFormSuggested';
import './index.scss';

interface Props {
   handleSubmit: (event: React.SyntheticEvent) => Promise<void>;
   setCurrentTab: Dispatch<SetStateAction<string>>;
   currentTab: string;
   handleChange: (event: React.SyntheticEvent, currentValue: string) => void;
   values: Query;
   setValues: Dispatch<SetStateAction<Query>>;
   goals: CurrentGoals;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setLoading: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setShowLoadMoreBtn: Dispatch<SetStateAction<boolean>>;
   setSearchResults: Dispatch<SetStateAction<SearchResults[]>>;
}

export const SearchForm = ({
   handleSubmit,
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
   setSearchResults,
}: Props) => {
   const [error, setError] = useState<boolean>(false); //used to show input field error when route is set to ingredients

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [event.target.id]: event.target.value });
   };

   const handleTypeSelect = (event: SelectChangeEvent) => {
      setValues({ ...values, category: event.target.value });
   };
   return (
      <div className='search-form'>
         <Stack direction='row' spacing={1}>
            <ScreenSearchDesktopIcon />
            <Typography variant='body1'>
               Search from a list of over 350,000 foods to find the ones that
               match your nutrient goals
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
               values={values}
               handleSubmit={handleSubmit}
               handleInputChange={handleInputChange}
               handleTypeSelect={handleTypeSelect}
            />
         ) : (
            <SearchFormSuggested
               values={values}
               handleInputChange={handleInputChange}
               handleTypeSelect={handleTypeSelect}
               goals={goals}
               setValues={setValues}
               setAlertMessage={setAlertMessage}
               setAlertSeverity={setAlertSeverity}
               setLoading={setLoading}
               setOpenAlert={setOpenAlert}
               setShowLoadMoreBtn={setShowLoadMoreBtn}
               setSearchResults={setSearchResults}
            />
         )}
      </div>
   );
};
