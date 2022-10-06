import { Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { FoodNutrition } from '../../../../types/types';

interface Props {
   nutritionData: FoodNutrition;
}
export const NutritionDataForm = ({ nutritionData }: Props) => {
   console.log('nutritionData: ', nutritionData);
   return (
      <>
         <Paper elevation={5}>
            <Typography variant='h6'>Nutrition Facts</Typography>
            {Object.keys(nutritionData).map((nutrient, index) => (
               <React.Fragment key={index}>
                  <Divider />
                  <Stack direction={'row'} sx={{ p: '1rem' }}>
                     <Typography>{nutrient.replace('_', ' ')}</Typography>
                  </Stack>
               </React.Fragment>
            ))}
         </Paper>
      </>
   );
};
