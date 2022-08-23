import React from 'react';
import './SampleRecipeCard.scss';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
   Grid,
   IconButton,
   Divider,
   Stack,
   Card,
   CardHeader,
   CardActions,
   CardContent,
   CardMedia,
   Typography,
   Button,
   Tooltip,
} from '@mui/material';
import { pointer } from '@testing-library/user-event/dist/types/setup/directApi';

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
   diets: string[];
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
   diets,
}: Props) => {
   const openInNewTab = (url: string): void => {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
   };

   if (image !== undefined) {
      diets = diets.slice(0, 2);
      return (
         <>
            <Grid
               item
               xs={4}
               sm={4}
               md={6}
               // onClick={() => openInNewTab(sourceUrl)}
            >
               <Card sx={{ height: '100%', width: '100%' }}>
                  <CardHeader
                     title={title}
                     action={
                        <Tooltip title='Open recipe in new tab'>
                           <IconButton onClick={() => openInNewTab(sourceUrl)}>
                              <OpenInNewIcon />
                           </IconButton>
                        </Tooltip>
                     }
                  />
                  <CardMedia
                     component='img'
                     image={image}
                     alt={title}
                     height='180'
                  />
                  <CardContent>
                     <Stack
                        direction='row'
                        justifyContent='space-evenly'
                        alignItems='center'
                        spacing={2}
                        divider={<Divider orientation='vertical' flexItem />}
                     >
                        {diets.map((diet) => (
                           <Typography
                              key={diet}
                              className='recipe-card-diet-label'
                              variant='overline'
                           >
                              {diet}
                           </Typography>
                        ))}
                     </Stack>
                  </CardContent>
               </Card>
            </Grid>
         </>
      );
   } else {
      return null;
   }
};
