import React, { Dispatch, SetStateAction } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField, Box } from '@mui/material';
import { getFormattedDate } from './getFormattedDateFunc';
import getUnixTime from 'date-fns/getUnixTime';
import { MealPlanType } from '../../../../server/API/api.types';

interface Props {
   setData: Dispatch<SetStateAction<MealPlanType>>;
   data: MealPlanType;
}

export const DatePickerTextField = ({ setData, data }: Props) => {
   const [value, setValue] = React.useState<Date | null>(new Date(Date.now()));

   const handleChange = (newValue: Date | null) => {
      setValue(newValue);

      let { year, month, day, hour, min, sec } = getFormattedDate(newValue);

      const result = getUnixTime(new Date(year, month, day, hour, min, sec));

      // setData(...data, data.date: result)
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
               value={value}
               onChange={handleChange}
               renderInput={(params) => <TextField {...params} />}
            />
         </Box>
      </LocalizationProvider>
   );
};
