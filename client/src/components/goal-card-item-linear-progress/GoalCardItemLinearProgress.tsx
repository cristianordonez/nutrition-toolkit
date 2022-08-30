import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import {
   Card,
   CardContent,
   Typography,
   LinearProgress,
   Stack,
} from '@mui/material';
import React from 'react';

interface Props {
   nutrientsTotal: number;
   type: string;
   nutrientsInMealPlan: number;
}

export const GoalCardItemLinearProgress = ({
   nutrientsTotal,
   type,
   nutrientsInMealPlan,
}: Props): ReactJSXElement => {
   let percentageTotal;
   if (nutrientsInMealPlan !== undefined) {
      percentageTotal = Math.floor(
         (nutrientsInMealPlan / nutrientsTotal) * 100
      );
   }

   return (
      <>
         <Card>
            <CardContent
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: '240px',
                  flexGrow: '0',
                  gap: '1rem',
               }}
            >
               <Stack direction={'row'} gap='1rem' alignItems='space-between'>
                  <Typography align='center' variant='body1'>
                     {type}
                  </Typography>
                  <Typography
                     align='center'
                     variant='body1'
                     sx={{ marginLeft: 'auto' }}
                  >
                     {Math.floor(nutrientsInMealPlan)} / {nutrientsTotal} g
                  </Typography>
               </Stack>
               <LinearProgress variant='determinate' value={percentageTotal} />
            </CardContent>
         </Card>
      </>
   );
};
