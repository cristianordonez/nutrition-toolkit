import { AlertColor } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {} from '../../../../../../../../types/types';
import { ConfirmDeleteDialog } from '../../ConfirmDeleteDialog';

interface Props {
   type: string;
   id: number;
   shoppingListId: number;
   servings: number;
   title: string;
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   // setMealPlanItems: Dispatch<SetStateAction<MealplanItemType[] | []>>;
   currentDay: string;
   amount?: number | undefined;
   unit?: string | undefined;
   image: string | undefined;
}

export const MealplanItem = ({
   type,
   id,
   shoppingListId,
   // setMealPlanItems,
   currentDay,
   servings,
   title,
   setOpenAlert,
   setAlertSeverity,
   setAlertMessage,
   amount,
   image,
   unit,
}: Props) => {
   // const [itemData, setItemData] = useState<null | FoodItemType | any>(null); //will hold value of the items data after calling endpoint
   const [openDialog, setOpenDialog] = useState<boolean>(false);

   const handleOpeningDialog = () => {
      setOpenDialog(!openDialog);
   };

   //TODO create new meal plan item, and move confirm delete dialog to seperate file
   return (
      <>
         {/* <FoodItemContents
               servings={servings}
               route={type}
               id={id}
               image={itemData?.image}
               title={title}
               restaurantChain={itemData?.restaurantChain || undefined}
               nutrition={itemData?.nutrition}
               url={itemData?.sourceUrl || undefined}
               handleOpeningDialog={handleOpeningDialog}
               isMealPlanItem={true} //used to add a X icon to delete mealplans
            /> */}
         <ConfirmDeleteDialog
            // setMealPlanItems={setMealPlanItems}
            currentDay={currentDay}
            setOpenAlert={setOpenAlert}
            setAlertSeverity={setAlertSeverity}
            setAlertMessage={setAlertMessage}
            shoppingListId={shoppingListId}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            handleOpeningDialog={handleOpeningDialog}
         />
      </>
   );
};
