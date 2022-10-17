import { Paper, Typography } from '@mui/material';
import endOfWeek from 'date-fns/endOfWeek';
import format from 'date-fns/format';
import startOfWeek from 'date-fns/startOfWeek';
import React from 'react';
import './FoodLogWeekText.scss';

interface Props {
   currentDay: string;
}

export const FoodLogWeekText = ({ currentDay }: Props) => {
   const startDate = format(startOfWeek(new Date(currentDay)), 'MMMM dd, yyyy');
   const endDate = format(endOfWeek(new Date(currentDay)), 'MMMM dd, yyyy');

   return (
      <>
         <Paper className='food-log-week-text' color='secondary'>
            <Typography variant='body1'>Viewing Week:</Typography>
            <Typography variant='body1'>{startDate}</Typography>
            <Typography variant='body1'>-</Typography>
            <Typography variant='body1'>{endDate}</Typography>
         </Paper>
      </>
   );
};
