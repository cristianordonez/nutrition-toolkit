import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { ConfirmDeleteDialog } from './ConfirmDeleteDialog';
import { FoodItemContents } from '../shared/FoodItemContents';
import { AlertColor } from '@mui/material';
import { FoodItemType } from '../food-search-list/food-search-list.types';
import axios from 'axios';

interface Props {
   position: number;
   slot: number;
   type: string;
   id: number;
   shoppingListId: number;
   imageType: string;
   servings: number;
   title: string;
   setOpenSnackbar: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor | undefined>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setMealPlanItems: Dispatch<SetStateAction<[]>>;
   currentDay: string;
}

export const MealplanItem = ({
   position,
   slot,
   type,
   id,
   shoppingListId,
   setMealPlanItems,
   currentDay,
   imageType,
   servings,
   title,
   setOpenSnackbar,
   setAlertSeverity,
   setAlertMessage,
}: Props) => {
   const [itemData, setItemData] = useState<null | FoodItemType>(null); //will hold value of the items data after calling endpoint
   const [openDialog, setOpenDialog] = useState<boolean>(false);

   const handleOpeningDialog = () => {
      setOpenDialog(!openDialog);
   };

   useEffect(() => {
      let url: string = `/api/recipes/${id}`; //set initial value for url to avoid typescript error
      if (type === 'RECIPE') {
         url = `/api/recipes/${id}`;
      } else if (type === 'PRODUCT') {
         url = `/api/groceryProducts/${id}`;
      } else if (type === 'MENU_ITEM') {
         url = `/api/menuItems/${id}`;
      }

      //call endpoint to get the rest of the itemData information
      axios
         .get(url)
         .then((itemInfo) => {
            setItemData(itemInfo.data);
         })
         .catch((err) => {
            console.log('err in meal plan itemData', err);
         });
   }, [id]);

   if (itemData) {
      return (
         <>
            <FoodItemContents
               route={type}
               image={itemData?.image}
               title={itemData?.title}
               restaurantChain={itemData?.restaurantChain || undefined}
               nutrition={itemData?.nutrition}
               url={itemData?.sourceUrl || undefined}
               handleOpeningDialog={handleOpeningDialog}
               isMealPlanItem={true} //used to add a X icon to delete mealplans
            />
            <ConfirmDeleteDialog
               setMealPlanItems={setMealPlanItems}
               currentDay={currentDay}
               setOpenSnackbar={setOpenSnackbar}
               setAlertSeverity={setAlertSeverity}
               setAlertMessage={setAlertMessage}
               shoppingListId={shoppingListId}
               openDialog={openDialog}
               setOpenDialog={setOpenDialog}
               handleOpeningDialog={handleOpeningDialog}
            />
         </>
      );
   } else {
      return <div>Loading...</div>;
   }
};
