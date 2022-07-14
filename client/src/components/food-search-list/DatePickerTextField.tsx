import React, { Dispatch, SetStateAction } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField, Box } from '@mui/material';
import { MealPlanType } from '../../../../server/API/api.types';
import { getFormattedDate } from '../../helper-functions/getFormattedDateFunc';
import getUnixTime from 'date-fns/getUnixTime';
import { zonedTimeToUtc, formatInTimeZone, getTimezoneOffset } from 'date-fns-tz'
import { format, addMinutes } from 'date-fns';


interface Props {
   setData: Dispatch<SetStateAction<MealPlanType>>;
   data: MealPlanType;
}

//! if error persists, consider using startOfDay function from date-fns
//fixed error with day being one day ahead
//material ui returns a date in string format Jan 12 2022 for example, but spoonacular requires Unix time
export const DatePickerTextField = ({ setData, data }: Props) => {
   const [value, setValue] = React.useState<any>(new Date(Date.now()));
   const handleChange = (newValue: any) => {
      setValue(newValue);
      let currentDate = zonedTimeToUtc(newValue, 'UTC'); //need to convert local time to UTC time to prevent bugs
      // let currentDate = formatInTimeZone(new Date(Date.now()), 'America/New_York', 'yyyy-MM-dd HH:mm:ssXXX')
      let { year, month, day, hour, min, sec } = getFormattedDate(currentDate);
      const result = getUnixTime(new Date(year, month, day, hour, min, sec));
      setData({ ...data, date: result });
   };


   return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         {/* mobile */}
         <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <MobileDatePicker
               label='Date mobile'
               inputFormat='MM/dd/yyyy'
               value={value}
               onChange={handleChange}
               renderInput={(params) => <TextField {...params} />}
            />
         </Box>
         {/* desktop */}
         <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <DesktopDatePicker
               label='Date desktop'
               inputFormat='MM/dd/yyyy'
               data-testid='date-picker-textfield'
               value={value}
               onChange={handleChange}
               renderInput={(params) => <TextField {...params} />}
            />
         </Box>
      </LocalizationProvider>
   );
};
