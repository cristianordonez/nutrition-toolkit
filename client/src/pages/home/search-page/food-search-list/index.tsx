import React, {
   useState,
   SetStateAction,
   Dispatch,
   MouseEventHandler,
} from 'react';
import './index.scss';
// import { FoodSearchItem } from './food-search-item/FoodSearchItem';
import Grid from '@mui/material/Grid';
import { FoodItemContents } from '../../../../components/food-item-contents/FoodItemContents';
import { AddToCartModal } from './AddToCartModal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { FoodItemType, IngredientType } from '../../../../../../types/types';
import { AlertColor } from '@mui/material';
import { setISODay } from 'date-fns/esm';

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
   const [openDialog, setOpenDialog] = useState<boolean>(false);
   const [currentImage, setCurrentImage] = useState('');
   const [currentId, setCurrentId] = useState<number>(0);
   const [currentTitle, setCurrentTitle] = useState('');

   const handleOpeningAddToMealplanDialog = (
      imageType: string,
      title: string,
      id: number
   ) => {
      setCurrentImage(imageType);
      setCurrentTitle(title);
      console.log('id:', id);
      setCurrentId(id);
      setOpenDialog(!openDialog);
   };

   const handleOpeningDialog = () => {
      setOpenDialog(!openDialog);
   };

   return (
      <>
         <div className='food-search-list'>
            <Stack
               direction='row'
               spacing={{ xs: 0, sm: 1 }}
               sx={{ width: '100%' }}
            >
               <MenuBookIcon />
               <Typography variant='body1'>
                  Click on the Add to Mealplan button then choose intended date
                  and slot (morning, afternoon, or evening) to save any item
               </Typography>
            </Stack>
            <div className='food-search-main-container'>
               {apiData.map((item: FoodItemType, index: number) => (
                  // <FoodSearchItem
                  //    key={item.id}
                  //    id={item.id}
                  //    imageType={item.imageType}
                  //    image={item.image}
                  //    title={item.title}
                  //    nutrition={item.nutrition}
                  //    route={route}
                  //    url={item.sourceUrl} //only found in recipe item
                  //    restaurantChain={item.restaurantChain} //only found in menu items
                  //    setAlertMessage={setAlertMessage}
                  //    setOpenSnackbar={setOpenSnackbar}
                  //    setAlertSeverity={setAlertSeverity}
                  // />
                  <React.Fragment key={index}>
                     <div data-testid='food-search-item'>
                        <FoodItemContents
                           route={route}
                           image={item.image}
                           id={item.id}
                           title={item.title}
                           restaurantChain={item.restaurantChain}
                           nutrition={item.nutrition}
                           url={item.sourceUrl}
                           imageType={item.imageType}
                           handleOpeningAddToMealplanDialog={
                              handleOpeningAddToMealplanDialog
                           }
                           isMealPlanItem={false} //used to add a X icon to delete mealplans
                        />
                     </div>
                  </React.Fragment>
               ))}
            </div>
            {showLoadMoreBtn ? (
               <Button fullWidth onClick={handleLoadMore} variant='contained'>
                  Load More
               </Button>
            ) : null}
         </div>
         <AddToCartModal
            openDialog={openDialog}
            handleOpeningDialog={handleOpeningDialog}
            route={route}
            imageType={currentImage}
            title={currentTitle}
            id={currentId}
            setOpenDialog={setOpenDialog}
            setAlertMessage={setAlertMessage}
            setOpenSnackbar={setOpenSnackbar}
            setAlertSeverity={setAlertSeverity}
         />
      </>
   );
};
