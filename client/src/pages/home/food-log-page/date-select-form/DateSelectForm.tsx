import { Box, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
   currentDay: string;
   setCurrentDay: Dispatch<SetStateAction<string>>;
   setDayIndex: Dispatch<SetStateAction<number>>;
   value: Date | string | number;
   setValue: Dispatch<SetStateAction<Date | string | number>>;
}

export const DateSelectForm = ({
   currentDay,
   setCurrentDay,
   setDayIndex,
   value,
   setValue,
}: Props) => {
   //eslint-disable-next-line
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
