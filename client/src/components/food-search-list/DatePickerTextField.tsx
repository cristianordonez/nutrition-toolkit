import React, { Dispatch, SetStateAction } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField, Box } from '@mui/material';
import { getFormattedDate } from '../../helper-functions/getFormattedDateFunc';
import { MealPlanType } from '../../../../server/API/api.types';
import getUnixTime from 'date-fns/getUnixTime';

interface Props {
   setData: Dispatch<SetStateAction<MealPlanType>>;
   data: MealPlanType;
}

//todo fix error with day being one day ahead
//todo use the new date-fns-tz library that is already installed
//material ui returns a date in string format Jan 12 2022 for example, but spoonacular requires Unix time
export const DatePickerTextField = ({ setData, data }: Props) => {
   const [value, setValue] = React.useState<Date | null>(new Date(Date.now()));
   const handleChange = (newValue: Date | null) => {
      setValue(newValue);
      console.log('newvalue:', newValue)
      let { year, month, day, hour, min, sec } = getFormattedDate(newValue);
      console.log('day: ', day)
      const result = getUnixTime(new Date(year, month, day, hour, min, sec));
      console.log('result in date picker text field:', result)
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
