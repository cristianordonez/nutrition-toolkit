import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import {
   Box,
   Card,
   CardContent,
   LinearProgress,
   Stack,
   Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

interface Props {
   nutrientsTotal: number;
   type: string;
   nutrientsInMealPlan: number;
}

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
   colorPrimary: {
      backgroundColor: 'red',
   },
   barColorPrimary: {
      backgroundColor: 'red',
   },
}));

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
