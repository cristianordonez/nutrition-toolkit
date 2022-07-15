import React, { Dispatch, SetStateAction } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField, Box } from '@mui/material';
import { addToMealPlanType } from '../../../../server/API/api.types';
import { getFormattedDate } from '../../helper-functions/getFormattedDateFunc';
import getUnixTime from 'date-fns/getUnixTime';
import { zonedTimeToUtc, } from 'date-fns-tz'
import { format, addMinutes } from 'date-fns';
import { MealplanItemType } from '../mealplan-day';

//todo change props and input items
interface Props {
   currentDay: string;
   setCurrentDay: Dispatch<SetStateAction<string>>;
   setBreakfastItems: Dispatch<SetStateAction<MealplanItemType[]>>;
   setLunchItems: Dispatch<SetStateAction<MealplanItemType[]>>;
   setDinnerItems: Dispatch<SetStateAction<MealplanItemType[]>>;

}

export const DateSelectForm = ({ currentDay, setCurrentDay, setBreakfastItems}: Props) => {
   console.log('currentday:', currentDay)
   //must use seperate value for initital state to prevent date being off by 1 day due to different expected format
   const [value, setValue] = React.useState<any>(new Date(Date.now()));
   //material ui returns a date in string format Jan 12 2022 for example, but spoonacular requires Unix time


   const handleChange = async (newValue: any) => {
      setBreakfastItems([]);
      setValue(newValue) //update the state for date text field 
      console.log('newValue:', newValue)
      setCurrentDay(format(newValue, 'yyyy-MM-dd'))      
   //   let currentDate = zonedTimeToUtc(newValue, 'UTC'); //need to convert local time to UTC time to prevent bugs

   };


   return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         {/* mobile */}
         <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <MobileDatePicker
               label='Current Date'
               inputFormat='MM/dd/yyyy'
               value={currentDay}
               onChange={handleChange}
               renderInput={(params) => <TextField {...params} variant='standard' />}
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
               renderInput={(params) => <TextField {...params} variant='standard'/>}
            />
         </Box>
      </LocalizationProvider>
   );
};
