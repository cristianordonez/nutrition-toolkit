import React from 'react';
import './CaloriesCircularProgress.scss';
import { Typography, CircularProgress, Button } from '@mui/material';

interface Props {
   calories: number | undefined;
   caloriesUsed: number;
   caloriesTotal: number;
}

export const CaloriesCircularProgress = ({
   calories,
   caloriesUsed,
   caloriesTotal,
}: Props) => {
   return (
      <>
         <div className='daily-goals-kcal'>
            <CircularProgress
               variant='determinate'
               size={200}
               value={calories}
               thickness={1}
               color='secondary'
            />
            <div className='daily-goals-kcal-title'>
               <Typography variant='body1' align='center'>
                  Calories
               </Typography>
               <Typography variant='h6'>
                  {caloriesUsed} / {caloriesTotal}
               </Typography>
            </div>
         </div>
      </>
   );
};
