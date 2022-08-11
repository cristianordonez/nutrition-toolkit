import React from 'react';
import './HomePageCard.scss';
import { Typography, Card, CardContent, Grid } from '@mui/material';

interface Props {
   body: string;
   title: string;
   image: string;
}

export const HomePageCard = ({ body, title, image }: Props) => {
   return (
      <Grid item xs={12} sm={4} className='home-page-grid'>
         <Card elevation={2} className='home-page-card'>
            <img
               className='home-page-card-image'
               src={image}
               alt='how to use app'
            />
            <CardContent>
               <Typography textAlign='center' variant='h6'>
                  {title}
               </Typography>
               <Typography variant='body2'>{body}</Typography>
            </CardContent>
         </Card>
      </Grid>
   );
};
