import React, { Dispatch, SetStateAction } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField, Box } from '@mui/material';
import { addToMealPlanType } from '../../../../../../types/types';
import { getFormattedDate } from '../../../../utils/getFormattedDateFunc';
import getUnixTime from 'date-fns/getUnixTime';
import { zonedTimeToUtc } from 'date-fns-tz';
import startOfDay from 'date-fns/startOfDay';
import startOfToday from 'date-fns/startOfToday';

interface Props {
   setData: Dispatch<SetStateAction<addToMealPlanType>>;
   data: addToMealPlanType;
}

//material ui returns a date in string format Jan 12 2022 for example, but spoonacular requires Unix time
export const DatePickerTextField = ({ setData, data }: Props) => {
   const [value, setValue] = React.useState<any>(startOfToday());

   const handleChange = (newValue: any) => {
      setValue(newValue);
      let currentDate = zonedTimeToUtc(newValue, 'UTC'); //need to convert local time to UTC time to prevent bugs
      // let currentDate = formatInTimeZone(new Date(Date.now()), 'America/New_York', 'yyyy-MM-dd HH:mm:ssXXX')
      let { year, month, day, hour, min, sec } = getFormattedDate(currentDate);
      const startOfCurrentDay = startOfDay(
         new Date(year, month, day, hour, min, sec)
      );
      const result = getUnixTime(startOfCurrentDay);
      setData({ ...data, date: result });
   };

   return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <MobileDatePicker
               label='Select day'
               inputFormat='MM/dd/yyyy'
               value={value}
               onChange={handleChange}
               renderInput={(params) => (
                  <TextField {...params} variant='standard' />
               )}
            />
         </Box>
         <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <DesktopDatePicker
               label='Select day'
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
   );
};
