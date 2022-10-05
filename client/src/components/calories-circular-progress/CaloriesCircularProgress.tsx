import { CircularProgress, Typography } from '@mui/material';
import React from 'react';
import './CaloriesCircularProgress.scss';

interface Props {
   calories: number;
   goalCalories: number;
}

export const CaloriesCircularProgress = ({ calories, goalCalories }: Props) => {
   console.log('calories: ', calories);
   return (
      <>
         <div className='daily-goals-kcal'>
            <CircularProgress
               variant='determinate'
               size={200}
               value={(calories / goalCalories) * 100}
               thickness={1}
               color='primary'
            />
            <div className='daily-goals-kcal-title'>
               <Typography variant='body1' align='center'>
                  Calories
               </Typography>
               <Typography variant='h6'>
                  {calories} / {goalCalories}
               </Typography>
            </div>
         </div>
      </>
   );
};
