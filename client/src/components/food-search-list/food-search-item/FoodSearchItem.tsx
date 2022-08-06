import React, { useState, Dispatch, SetStateAction } from 'react';
import './FoodSearchItem.scss';
import { FoodItemContents } from '../../shared/FoodItemContents';
import { Grid, AlertColor } from '@mui/material';
import { AddToCartModal } from '../AddToCartModal';
import {
   GroceryItemNutrition,
   RecipeItemNutrition,
   MenuItemNutrition,
} from '../food-search-list.types';

interface Props {
   id: number;
   imageType: string;
   image: string;
   title: string;
   nutrition:
      | GroceryItemNutrition
      | RecipeItemNutrition
      | MenuItemNutrition
      | any;
   route: string;
   url?: string;
   restaurantChain?: string;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setOpenSnackbar: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor | undefined>>;
}

export const FoodSearchItem = ({
   route,
   image,
   imageType,
   title,
   nutrition,
   restaurantChain,
   url,
   id,
   setAlertMessage,
   setOpenSnackbar,
   setAlertSeverity,
}: Props) => {
   const [openDialog, setOpenDialog] = useState<boolean>(false);

   const handleOpeningDialog = () => {
      setOpenDialog(!openDialog);
   };

   return (
      <>
         <Grid item xs={12} sm={6} md={4} data-testid='food-search-item'>
            <FoodItemContents
               route={route}
               image={image}
               title={title}
               restaurantChain={restaurantChain}
               nutrition={nutrition}
               url={url}
               handleOpeningDialog={handleOpeningDialog}
               isMealPlanItem={false} //used to add a X icon to delete mealplans
            />
         </Grid>
         <AddToCartModal
            openDialog={openDialog}
            handleOpeningDialog={handleOpeningDialog}
            route={route}
            imageType={imageType}
            title={title}
            id={id}
            setOpenDialog={setOpenDialog}
            setAlertMessage={setAlertMessage}
            setOpenSnackbar={setOpenSnackbar}
            setAlertSeverity={setAlertSeverity}
         />
      </>
   );
};
