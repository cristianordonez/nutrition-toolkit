import React from 'react';
import './HomePageCard.scss';
import {
   Typography,
   Card,
   CardContent,
   CardMedia,
   Paper,
   Grid,
} from '@mui/material';

interface Props {
   body: string;
   title: string;
   image: string;
}

export const HomePageCard = ({ body, title, image }: Props) => {
   return (
      <Grid item xs={12} sm={4} className='home-page-grid'>
         <Card elevation={2} className='home-page-card'>
            <CardMedia
               component='img'
               className='home-page-card-image'
               image={image}
               alt='How to use app'
               height='140'
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
