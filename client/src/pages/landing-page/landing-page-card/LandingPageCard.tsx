import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import './LandingPageCard.scss';

interface Props {
   body: string;
   title: string;
   image: string;
   feature: string;
   handleNavigatingToFeatures: (location: string) => void;
}

export const LandingPageCard = ({
   body,
   title,
   image,
   feature,
   handleNavigatingToFeatures,
}: Props) => {
   return (
      <Grid item xs={12} sm={4} className='home-page-grid'>
         <Card elevation={2} className='home-page-card'>
            <img className='home-page-card-image' src={image} alt={body} />
            <CardContent>
               <Typography textAlign='center' variant='h6'>
                  {title}
               </Typography>
               <Typography variant='body2'>{body}</Typography>
            </CardContent>
            <Button
               onClick={() => handleNavigatingToFeatures(feature)}
               fullWidth
               color='primary'
            >
               <Typography align='center' color='textPrimary'>
                  Try it out
               </Typography>
            </Button>
         </Card>
      </Grid>
   );
};
