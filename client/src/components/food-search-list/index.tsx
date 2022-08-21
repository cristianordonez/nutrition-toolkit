import React, { SetStateAction, Dispatch, MouseEventHandler } from 'react';
import './index.scss';
import { FoodSearchItem } from './food-search-item/FoodSearchItem';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { FoodItemType } from './food-search-list.types';
import { AlertColor } from '@mui/material';

interface Props {
   apiData: never[];
   route: string;
   handleLoadMore: MouseEventHandler<HTMLButtonElement>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setOpenSnackbar: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   showLoadMoreBtn: boolean;
}

export const FoodSearchList = ({
   apiData,
   route,
   handleLoadMore,
   setAlertMessage,
   setOpenSnackbar,
   setAlertSeverity,
   showLoadMoreBtn,
}: Props) => {
   return (
      <div className='food-search-list'>
         <Stack direction='row' spacing={1}>
            <MenuBookIcon />
            <Typography variant='body1'>
               Click on the Add to Mealplan button then choose intended date and
               slot (morning, afternoon, or evening) to save any item
            </Typography>
         </Stack>
         <Grid container spacing={2}>
            {apiData.map((item: FoodItemType) => (
               <FoodSearchItem
                  key={item.id}
                  id={item.id}
                  imageType={item.imageType}
                  image={item.image}
                  title={item.title}
                  nutrition={item.nutrition}
                  route={route}
                  url={item.sourceUrl || undefined} //only found in recipe item
                  restaurantChain={item.restaurantChain || undefined} //only found in menu items
                  setAlertMessage={setAlertMessage}
                  setOpenSnackbar={setOpenSnackbar}
                  setAlertSeverity={setAlertSeverity}
               />
            ))}
         </Grid>
         {showLoadMoreBtn ? (
            <Button fullWidth onClick={handleLoadMore} variant='contained'>
               Load More
            </Button>
         ) : null}
      </div>
   );
};
