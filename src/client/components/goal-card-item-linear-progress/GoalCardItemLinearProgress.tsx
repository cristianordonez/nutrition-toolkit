import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import {
   Box,
   Card,
   CardContent,
   LinearProgress,
   Stack,
   Typography,
} from '@mui/material';
import React from 'react';

interface Props {
   nutrientsTotal: number;
   type: string;
   nutrientsInFoodLog: number;
}

export const GoalCardItemLinearProgress = ({
   nutrientsTotal,
   type,
   nutrientsInFoodLog,
}: Props): ReactJSXElement => {
   let percentageTotal;
   if (nutrientsInFoodLog !== undefined) {
      percentageTotal = Math.floor((nutrientsInFoodLog / nutrientsTotal) * 100);
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
                     {Math.floor(nutrientsInFoodLog)} / {nutrientsTotal} g
                  </Typography>
               </Stack>

               {type === 'Carbohydrates' ? (
                  <Box sx={{ color: '#66E8BF', backgroundColor: 'inherit' }}>
                     <LinearProgress
                        variant='determinate'
                        color='inherit'
                        value={percentageTotal}
                     />
                  </Box>
               ) : null}
               {type === 'Protein' ? (
                  <Box sx={{ color: '#FCD875', backgroundColor: 'inherit' }}>
                     <LinearProgress
                        variant='determinate'
                        color='inherit'
                        value={percentageTotal}
                     />
                  </Box>
               ) : null}
               {type === 'Fat' ? (
                  <Box sx={{ color: '#FB8DE8', backgroundColor: 'inherit' }}>
                     <LinearProgress
                        variant='determinate'
                        color='inherit'
                        value={percentageTotal}
                     />
                  </Box>
               ) : null}
            </CardContent>
         </Card>
      </>
   );
};
