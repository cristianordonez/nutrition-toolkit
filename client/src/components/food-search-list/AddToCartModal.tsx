import React, {
   MouseEventHandler,
   Dispatch,
   SetStateAction,
   SyntheticEvent,
   useState,
} from 'react';
import { DialogSelectServings } from './DialogSelectServings';
import { DialogSelectSlot } from './DialogSelectSlot';
import { SelectChangeEvent } from '@mui/material/Select';
import {
   Dialog,
   DialogTitle,
   DialogContent,
   Box,
   DialogActions,
   Button,
   AlertColor,
} from '@mui/material';
import { DatePickerTextField } from './DatePickerTextField';
import { MealPlanType } from '../../../../server/API/api.types'; //interface from api handler
import axios from 'axios';
import getUnixTime from 'date-fns/getUnixTime';

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
   setAlertSeverity: Dispatch<SetStateAction<AlertColor | undefined>>;
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

   const [data, setData] = useState<MealPlanType>({
      date: getUnixTime(Date.now()),
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

   //# handles updating state when changing the slot select field
   const handleSelectSlot = (event: SelectChangeEvent) => {
      setData({ ...data, slot: parseInt(event.target.value) });
   };

   //#handles updating state when changing the servings select field
   const handleSelectServings = (event: SelectChangeEvent) => {
      setData((data) => {
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
      try {
         let response = await axios.post('/api/mealplan', data);
         console.log('respons:', response);
         setAlertSeverity('success');
         setAlertMessage('Item has been added to your mealplan!');
         setOpenSnackbar(true);
         setOpenDialog(false);
      } catch (err) {
         console.log('err:', err);
      }
   };

   return (
      <Dialog open={openDialog}>
         <DialogTitle>Enter custom calorie and carbohydrate</DialogTitle>
         <form onSubmit={handleSubmit}>
            <DialogContent>
               <Box display='flex' flexDirection='column' gap='10px'>
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
               <Button onClick={handleOpeningDialog}>Cancel</Button>
               <Button data-testid='add-mealplan-btn' aria-label='submit form to add to meal plan' type='submit'>Submit</Button>
            </DialogActions>
         </form>
      </Dialog>
   );
};
