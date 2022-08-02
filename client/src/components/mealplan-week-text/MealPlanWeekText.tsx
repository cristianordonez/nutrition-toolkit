import React, { useEffect } from 'react';
import { Paper } from '@mui/material';
import './MealPlanWeekText.scss';
import startOfWeek from 'date-fns/startOfWeek';
import format from 'date-fns/format';

import endOfWeek from 'date-fns/endOfWeek';
import { Typography } from '@mui/material';

interface Props {
   currentDay: string;
}

export const MealPlanWeekText = ({ currentDay }: Props) => {
   // useEffect(() => {

   // }, [currentDay])
   const startDate = format(startOfWeek(new Date(currentDay)), 'MMMM dd, yyyy');
   const endDate = format(endOfWeek(new Date(currentDay)), 'MMMM dd, yyyy');
   //    const endDate = endOfWeek(new Date(currentDay));

   console.log('startDate: ', startDate);
   console.log('endDate: ', endDate);

   return (
      <>
         <Paper className='mealplan-week-text' color='secondary'>
            <Typography variant='body1'>Viewing Week:</Typography>
            <Typography variant='body1'>{startDate}</Typography>
            <Typography variant='body1'>-</Typography>
            <Typography variant='body1'>{endDate}</Typography>
         </Paper>
      </>
   );
};
