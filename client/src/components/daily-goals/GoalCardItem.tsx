import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

interface Props {
   count: number;
   type: string;
}

export const GoalCardItem = ({ count, type }: Props): ReactJSXElement => {
   return (
      <>
         <Card>
            <CardContent>
               <Typography align='center' variant='h6'>
                  {count}
               </Typography>
               <Typography align='center' variant='body1'>
                  {type}
               </Typography>
            </CardContent>
         </Card>
      </>
   );
};
