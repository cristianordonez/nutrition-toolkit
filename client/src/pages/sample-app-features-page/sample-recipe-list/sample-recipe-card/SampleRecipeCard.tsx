import React from 'react';
import './SampleRecipeCard.scss';

import {
   Grid,
   Card,
   CardActions,
   CardContent,
   CardMedia,
   Typography,
   Button,
} from '@mui/material';

interface Props {
   image: string | undefined;
   sourceUrl: string;
   title: string;
   spoonacularSourceUrl: string;
   servings: number;
   vegan: boolean;
   vegetarian: boolean;
   lowFodmap: boolean;
   dairyFree: boolean;
   instructions: string;
}

export const SampleRecipeCard = ({
   image,
   sourceUrl,
   title,
   spoonacularSourceUrl,
   servings,
   vegan,
   vegetarian,
   lowFodmap,
   dairyFree,
   instructions,
}: Props) => {
   if (image !== undefined) {
      const GridStyle = {
         // backgroundImage: `url(${image})`,
         // backgroundRepeat: 'no-repeat',
         // backgroundSize: 'cover',
         // backgroundPosition: 'center',
         overflow: 'hidden',
         maxHeight: '400px',
      };
      return (
         <>
            <Grid item xs={4} style={GridStyle}>
               <img src={image} />
               <div className='sample-recipe-content'></div>

               {/* <div className='sample-recipe-content'></div> */}
               {/* <Card elevation={1}>

                  <CardMedia
                  component='img'
                  height='200'
                  alt={title}
                  image={image}
                  />
                  <CardContent>
                  <Typography variant='h6'>{title}</Typography>
                  <Typography variant='h6'>{servings}</Typography>
                  </CardContent>
                  <CardActions>
                  <Button
                  fullWidth
                  component='a'
                  href={sourceUrl}
                  target='_blank'
                  className='card-button'
                  variant='contained'
                  color='secondary'
                  size='small'
                  >
                  View Recipe
                  </Button>
                  </CardActions>
               </Card> */}
            </Grid>
         </>
      );
   } else {
      return null;
   }
};
