import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Card, CardContent, Typography } from '@mui/material';

import React, { SVGProps } from 'react';
import './GoalCardItemCard.scss';

interface Props {
   type: 'Carbohydrates' | 'Protein' | 'Fat';
   nutrientsTotal: number;
   Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

export const GoalCardItemCard = ({
   nutrientsTotal,
   type,
   Icon,
}: Props): ReactJSXElement => {
   return (
      <>
         <Card sx={{ borderRadius: '15%' }} elevation={5}>
            <CardContent
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '10rem',
                  width: '10rem',
                  alignItems: 'center',
                  gap: '1rem',
                  justifyContent: 'center',
               }}
            >
               <Icon className='svg-icon' />
               <Typography
                  sx={{ fontWeight: 'bold' }}
                  align='center'
                  variant='h5'
               >
                  {nutrientsTotal} g
               </Typography>
               <Typography
                  className='nutrient-type-text'
                  variant='body2'
                  align='center'
                  sx={{ width: '100%', opacity: '0.7' }}
                  component='div'
               >
                  {type}
               </Typography>
            </CardContent>
         </Card>
      </>
   );
};
