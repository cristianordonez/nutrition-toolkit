import { Box, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import React, { Dispatch, SetStateAction } from 'react';
// import { MealplanItemType } from '../../../../../../types/types';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';

interface Props {
   currentDay: string;
   setCurrentDay: Dispatch<SetStateAction<string>>;
   setDayIndex: Dispatch<SetStateAction<number>>;
   value: Date | string;
   setValue: Dispatch<SetStateAction<Date | string>>;
}

export const DateSelectForm = ({
   currentDay,
   setCurrentDay,
   setDayIndex,
   value,
   setValue,
}: Props) => {
   //must use seperate value for initital state to prevent date being off by 1 day due to different expected format
   //material ui returns a date in string format Jan 12 2022 for example, but spoonacular requires Unix time

   // TODO pass in setmealplanitems and call it here in handle change
   const handleChange = async (newValue: any) => {
      setDayIndex(getDay(newValue));
      setValue(newValue); //update the state for date text field
      setCurrentDay(format(newValue, 'yyyy-MM-dd'));
   };

   return (
      <Box
         sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
         }}
      >
         <LocalizationProvider dateAdapter={AdapterDateFns}>
            {/* mobile */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
               <MobileDatePicker
                  label='Current Date'
                  inputFormat='MM/dd/yyyy'
                  value={currentDay}
                  onChange={handleChange}
                  renderInput={(params) => (
                     <TextField {...params} variant='standard' />
                  )}
               />
            </Box>
            {/* desktop */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
               <DesktopDatePicker
                  label='Current Date'
                  inputFormat='MM/dd/yyyy'
                  data-testid='date-picker-textfield'
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => (
                     <TextField {...params} variant='standard' />
                  )}
               />
            </Box>
         </LocalizationProvider>
      </Box>
   );
};
