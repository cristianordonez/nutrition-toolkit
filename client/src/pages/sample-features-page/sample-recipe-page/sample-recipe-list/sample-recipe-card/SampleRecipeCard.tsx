import React from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
   Grid,
   IconButton,
   Divider,
   Stack,
   Card,
   CardHeader,
   CardContent,
   CardMedia,
   Typography,
   Tooltip,
} from '@mui/material';

interface Props {
   image: string | undefined;
   sourceUrl: string;
   title: string;
   diets: undefined | string[];
   route: string;
   restaurantChain?: string | undefined;
}

export const SampleRecipeCard = ({
   image,
   sourceUrl,
   title,
   diets,
   route,
   restaurantChain,
}: Props) => {
   const openInNewTab = (url: string): void => {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
   };

   if (image !== undefined) {
      if (diets !== undefined) {
         diets = diets.slice(0, 2);
      }
      return (
         <>
            <Grid item xs={4} sm={4} md={4} lg={4}>
               <Card sx={{ height: '100%', width: '100%' }}>
                  <CardHeader
                     title={title}
                     titleTypographyProps={{ variant: 'h6' }}
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
                        {diets !== undefined && route !== 'menuItems' ? (
                           diets.map((diet) => (
                              <Typography
                                 key={diet}
                                 className='recipe-card-diet-label'
                                 variant='overline'
                              >
                                 {diet}
                              </Typography>
                           ))
                        ) : (
                           <Typography variant='overline'>
                              {restaurantChain}
                           </Typography>
                        )}
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
