import {
   AlertColor,
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import getUnixTime from 'date-fns/getUnixTime';
import startOfToday from 'date-fns/startOfToday';
import React, {
   Dispatch,
   MouseEventHandler,
   SetStateAction,
   SyntheticEvent,
   useEffect,
   useState,
} from 'react';
import { AddToMealPlanType } from '../../../../../../types/types';
import { DatePickerTextField } from './DatePickerTextField';
import { DialogSelectServings } from './DialogSelectServings';
import { DialogSelectSlot } from './DialogSelectSlot';
interface Props {
   openDialog: boolean;
   handleOpeningDialog: MouseEventHandler<HTMLButtonElement>;
   route: string;
   imageType: string;
   title: string;
   id: number;
   setOpenDialog: Dispatch<SetStateAction<boolean>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setOpenSnackbar: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
}

export const AddToCartModal = ({
   openDialog,
   handleOpeningDialog,
   route,
   imageType,
   title,
   id,
   setOpenDialog,
   setAlertMessage,
   setOpenSnackbar,
   setAlertSeverity,
}: Props) => {
   let currentType;
   if (route === 'recipes') {
      currentType = 'RECIPE';
   } else if (route === 'groceryProducts') {
      currentType = 'PRODUCT';
   } else {
      currentType = 'MENU_ITEM';
   }

   const [data, setData] = useState<AddToMealPlanType | any>({
      date: getUnixTime(startOfToday()),
      slot: 1,
      position: 0, // the order in the slot
      type: currentType,
      value: {
         id: id,
         servings: 1,
         title: title, //comes from props
         imageType: imageType,
      },
   });

   console.log('id in add to card modal:', id);
   //# handles updating state when changing the slot select field
   const handleSelectSlot = (event: SelectChangeEvent) => {
      setData({ ...data, slot: parseInt(event.target.value) });
   };

   //#handles updating state when changing the servings select field
   const handleSelectServings = (event: SelectChangeEvent) => {
      setData((data: AddToMealPlanType) => {
         return {
            ...data,
            value: {
               ...data.value,
               servings: parseInt(event.target.value),
            },
         };
      });
   };

   //# handles adding the item to the mealplan
   const handleSubmit = async (event: SyntheticEvent) => {
      event.preventDefault();
      console.log('data:', data);
      try {
         let response = await axios.post('/api/mealplan', data);
         setAlertSeverity('success');
         setAlertMessage('Item has been added to your mealplan!');
         setOpenSnackbar(true);
         setOpenDialog(false);
      } catch (err) {
         console.log(err);
      }
   };

   //listens to id so that it can update the data object when item is clicked
   useEffect(() => {
      setData((data: AddToMealPlanType) => {
         return {
            ...data,
            value: {
               ...data.value,
               id,
               title,
               imageType,
            },
         };
      });
   }, [id]);

   return (
      <Dialog open={openDialog}>
         <DialogTitle align='left'>
            Select preferred day, slot and number of servings
         </DialogTitle>
         <form onSubmit={handleSubmit}>
            <DialogContent>
               <Box
                  display='flex'
                  flexDirection='column'
                  gap='1rem'
                  // alignItems='flex-start'
               >
                  <DatePickerTextField setData={setData} data={data} />
                  <DialogSelectSlot
                     handleSelectSlot={handleSelectSlot}
                     slot={data.slot}
                  />
                  <DialogSelectServings
                     handleSelectServings={handleSelectServings}
                     servings={data.value.servings}
                  />
               </Box>
            </DialogContent>
            <DialogActions>
               <Button
                  data-testid='add-mealplan-btn'
                  aria-label='submit form to add to meal plan'
                  type='submit'
                  variant='contained'
               >
                  Submit
               </Button>
               <Button
                  variant='contained'
                  aria-label='cancel'
                  onClick={handleOpeningDialog}
                  color='error'
               >
                  Cancel
               </Button>
            </DialogActions>
         </form>
      </Dialog>
   );
};
