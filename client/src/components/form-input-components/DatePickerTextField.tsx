import { Box, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { format } from 'date-fns-tz';
import startOfToday from 'date-fns/startOfToday';
import React, { Dispatch, SetStateAction } from 'react';
import { AddToMealPlanType } from '../../../../types/types';

interface Props {
   setData: Dispatch<SetStateAction<AddToMealPlanType>>;
   data: AddToMealPlanType;
}

export const DatePickerTextField = ({ setData, data }: Props) => {
   const [value, setValue] = React.useState<Date | null>(startOfToday());

   const handleChange = (newValue: Date | null) => {
      let inputDate = newValue as string | number | Date;
      setValue(newValue);
      // let currentDate = zonedTimeToUtc(inputDate, 'UTC'); //need to convert local time to UTC time to prevent bugs
      const result = format(inputDate, 'yyy-MM-dd') as unknown as Date;
      // let currentDate = formatInTimeZone(new Date(Date.now()), 'America/New_York', 'yyyy-MM-dd HH:mm:ssXXX')
      // let { year, month, day, hour, min, sec } = getFormattedDate(currentDate);
      setData({ ...data, date: result });
   };

   return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         <Box sx={{ display: { xs: 'block', sm: 'none' }, width: '100%' }}>
            <MobileDatePicker
               label='Select day'
               inputFormat='MM/dd/yyyy'
               value={value}
               onChange={handleChange}
               renderInput={(params) => (
                  <TextField {...params} variant='standard' fullWidth />
               )}
            />
         </Box>
         <Box sx={{ display: { xs: 'none', sm: 'block' }, width: '100%' }}>
            <DesktopDatePicker
               label='Select day'
               inputFormat='MM/dd/yyyy'
               data-testid='date-picker-textfield'
               value={value}
               onChange={handleChange}
               renderInput={(params) => (
                  <TextField {...params} variant='standard' fullWidth />
               )}
            />
         </Box>
      </LocalizationProvider>
   );
};
