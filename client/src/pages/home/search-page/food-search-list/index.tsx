import React, { SetStateAction, Dispatch, MouseEventHandler } from 'react';
import './index.scss';
import { FoodSearchItem } from './food-search-item/FoodSearchItem';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { FoodItemType } from '../../../../../../types/types';
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
   console.log('apiDatra:', apiData);
   return (
      <div className='food-search-list'>
         <Stack
            direction='row'
            spacing={{ xs: 0, sm: 1 }}
            sx={{ width: '100%' }}
         >
            <MenuBookIcon />
            <Typography variant='body1'>
               Click on the Add to Mealplan button then choose intended date and
               slot (morning, afternoon, or evening) to save any item
            </Typography>
         </Stack>
         <div className='food-search-main-container'>
            {apiData.map((item: FoodItemType) => (
               <FoodSearchItem
                  key={item.id}
                  id={item.id}
                  imageType={item.imageType}
                  image={item.image}
                  title={item.title}
                  nutrition={item.nutrition}
                  route={route}
                  url={item.sourceUrl} //only found in recipe item
                  restaurantChain={item.restaurantChain} //only found in menu items
                  setAlertMessage={setAlertMessage}
                  setOpenSnackbar={setOpenSnackbar}
                  setAlertSeverity={setAlertSeverity}
               />
            ))}
         </div>
         {showLoadMoreBtn ? (
            <Button fullWidth onClick={handleLoadMore} variant='contained'>
               Load More
            </Button>
         ) : null}
      </div>
   );
};
