import {
   AlertColor,
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
} from '@mui/material';
import axios from 'axios';
import React, {
   Dispatch,
   MouseEventHandler,
   SetStateAction,
   SyntheticEvent,
} from 'react';

interface Props {
   shoppingListId: number;
   openDialog: boolean;
   setOpenDialog: Dispatch<SetStateAction<boolean>>;
   handleOpeningDialog: MouseEventHandler<HTMLButtonElement>;
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   // setMealPlanItems: Dispatch<SetStateAction<MealplanItemType[]>>;
   currentDay: string;
}

export const ConfirmDeleteDialog = ({
   shoppingListId,
   openDialog,
   // setMealPlanItems,
   currentDay,
   setOpenDialog,
   handleOpeningDialog,
   setOpenAlert,
   setAlertSeverity,
   setAlertMessage,
}: Props) => {
   const handleDelete = async (event: SyntheticEvent) => {
      event.preventDefault();
      // setOpenAlert(true);
      try {
         let response = await axios.delete(
            `/api/mealplan/delete/${shoppingListId}`
         );
         setOpenDialog(false);
         setAlertSeverity('success');
         setAlertMessage('Mealplan item has been deleted.');
         setOpenAlert(true);
         try {
            //inner try to catch error when there are no meal plan items for current day
            let updatedItems = await axios.get('/api/mealplan/day', {
               params: { date: currentDay },
               withCredentials: true,
            });
            //TODO uncomment the lines below
            // setMealPlanItems(updatedItems.data.items);
         } catch (err) {
            console.log(err);
            // setMealPlanItems([]);
         }
      } catch (err) {
         setAlertSeverity('error');
         setAlertMessage('Unable to delete mealplan item.');
         setOpenAlert(true);
         setOpenDialog(false);
         console.log(err);
      }
   };
   return (
      <>
         <Dialog open={openDialog}>
            <DialogTitle>
               Are you sure you want to delete this item from your mealplan?
            </DialogTitle>
            <form onSubmit={handleDelete}>
               <DialogContent>
                  <Box display='flex' flexDirection='column' gap='10px'></Box>
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleOpeningDialog}>Cancel</Button>
                  <Button
                     data-testid='add-mealplan-btn'
                     aria-label='submit form to add to meal plan'
                     type='submit'
                  >
                     Delete
                  </Button>
               </DialogActions>
            </form>
         </Dialog>
      </>
   );
};
