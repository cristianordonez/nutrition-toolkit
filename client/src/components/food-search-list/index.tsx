import React from 'react';
import { FoodSearchItem } from './food-search-item/FoodSearchItem';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {
   FoodItemType
} from './food-search-list.types';

export const FoodSearchList = ({
   apiData,
   route,
   handleLoadMore,
   setAlertMessage,
   setOpenSnackbar,
   setAlertSeverity,
}: any) => {   
   console.log('apiData:', apiData)
   return (
      <>
         <Stack direction='row' spacing={1}>
            <MenuBookIcon />
            <Typography variant='h4' component='h1'>
               Results
            </Typography>
         </Stack>
         <Grid container spacing={2}>
            {route === 'recipes' &&
               apiData.map((item: FoodItemType) => (
                  <FoodSearchItem
                     key={item.id}
                     id={item.id}
                     imageType={item.imageType}
                     image={item.image}
                     title={item.title}
                     nutrition={item.nutrition}
                     route={route}
                     url={item.sourceUrl} //only found in recipe item
                     restaurantChain={item.restaurantChain || undefined} //only found in menu items
                     setAlertMessage={setAlertMessage}
                     setOpenSnackbar={setOpenSnackbar}
                     setAlertSeverity={setAlertSeverity}
                  />
               ))}
         </Grid>
         <Button fullWidth onClick={handleLoadMore}>
            Load More
         </Button>
      </>
   );
};
