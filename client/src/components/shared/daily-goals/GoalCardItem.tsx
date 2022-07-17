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
   nutrientsInMealPlan?: number;
}

export const GoalCardItem = ({
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
            <CardContent>
               <Stack direction={'row'}>
                  <Typography align='center' variant='body1'>
                     {type}
                  </Typography>
                  {nutrientsInMealPlan !== undefined ? (
                     <Typography align='center' variant='subtitle1'>
                        {nutrientsInMealPlan} / {nutrientsTotal}
                     </Typography>
                  ) : (
                     <Typography align='center' variant='h6'>
                        {nutrientsTotal}
                     </Typography>
                  )}
               </Stack>

               <LinearProgress
                  variant='determinate'
                  value={nutrientsInMealPlan || 100}
               />
            </CardContent>
         </Card>
      </>
   );
};
