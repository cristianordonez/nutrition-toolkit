import MenuBookIcon from '@mui/icons-material/MenuBook';
import { AlertColor } from '@mui/material';
import { AddIngredientToCartModal } from './AddIngredientToCartModal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, {
   Dispatch,
   MouseEventHandler,
   SetStateAction,
   useState,
} from 'react';
import { FoodItemType, IngredientType } from '../../../../../../types/types';
import { FoodItemContents } from '../../../../components/food-item-contents/FoodItemContents';
import { AddToCartModal } from './AddToCartModal';
import './index.scss';

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
   const [units, setUnits] = useState<string[]>(['']);

   const handleOpeningAddIngredientModal = (
      img: string,
      title: string,
      units: string[],
      id: number
   ) => {
      setCurrentImage(img);
      setCurrentTitle(title);
      setUnits(units);
      setCurrentId(id);
      setOpenDialog(!openDialog);
   };

   const handleOpeningAddToMealplanDialog = (
      imageType: string,
      title: string,
      id: number
   ) => {
      setCurrentImage(imageType);
      setCurrentTitle(title);
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
            {route === 'ingredients' ? (
               <Typography>
                  * Note that ingredients cannot currently be added to mealplan.{' '}
               </Typography>
            ) : null}
            <div className='food-search-main-container'>
               {route === 'ingredients'
                  ? apiData.map((item: IngredientType, index: number) => (
                       <React.Fragment key={index}>
                          <div data-testid='food-search-item'>
                             <FoodItemContents
                                route={route}
                                image={item.image}
                                id={item.id}
                                title={item.name}
                                nutrition={item.nutrition}
                                imageType={'jpg'}
                                handleOpeningAddIngredientModal={
                                   handleOpeningAddIngredientModal
                                }
                                amount={item.amount}
                                possibleUnits={item.possibleUnits}
                                unit={item.unit}
                                isMealPlanItem={false} //used to add a X icon to delete mealplans
                             />
                          </div>
                       </React.Fragment>
                    ))
                  : apiData.map((item: FoodItemType, index: number) => (
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

         {route === 'ingredients' ? null : (
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
         )}
      </>
   );
};
