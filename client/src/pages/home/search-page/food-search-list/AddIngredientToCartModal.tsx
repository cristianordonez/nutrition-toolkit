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
import {
   AddIngredientsToMealPlan,
   AddToMealPlanType,
} from '../../../../../../types/types';
import { DatePickerTextField } from './DatePickerTextField';
import { DialogSelectServings } from './DialogSelectServings';
import { DialogSelectAmount } from './DialogSelectAmount';
import { DialogSelectSlot } from './DialogSelectSlot';
import { DialogSelectUnit } from './DialogSelectUnit';

interface Props {
   openDialog: boolean;
   possibleUnits: string[];
   handleOpeningDialog: MouseEventHandler<HTMLButtonElement>;
   title: string;
   id: number;
   image: string;
   setOpenDialog: Dispatch<SetStateAction<boolean>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setOpenSnackbar: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
}

export const AddIngredientToCartModal = ({
   openDialog,
   handleOpeningDialog,
   possibleUnits,
   title,
   id,
   image,
   setOpenDialog,
   setAlertMessage,
   setOpenSnackbar,
   setAlertSeverity,
}: Props) => {
   const [data, setData] = useState<AddToMealPlanType | any>({
      date: getUnixTime(startOfToday()),
      slot: 1,
      position: 0, // the order in the slot
      type: 'INGREDIENTS',
      value: {
         name: title, //prop comes in as title, but ingredients expect key called name
         unit: possibleUnits[0],
         amount: '1',
         image: image,
         id: id,
      },
   });

   //# handles updating state when changing the slot select field
   const handleSelectSlot = (event: SelectChangeEvent) => {
      setData({ ...data, slot: parseInt(event.target.value) });
   };

   //#handles updating state when changing the servings select field
   const handleSelectAmount = (event: SelectChangeEvent) => {
      setData((data: AddIngredientsToMealPlan) => {
         return {
            ...data,
            value: {
               ...data.value,
               amount: parseInt(event.target.value),
            },
         };
      });
   };

   const handleSelectUnit = (event: SelectChangeEvent) => {
      setData((data: AddIngredientsToMealPlan) => {
         return {
            ...data,
            value: {
               ...data.value,
               unit: event.target.value,
            },
         };
      });
   };

   //# handles adding the item to the mealplan
   const handleSubmit = async (event: SyntheticEvent) => {
      event.preventDefault();
      try {
         await axios.post('/api/mealplan', data);
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
      console.log('title:', title);
      console.log('possibleUnits:', possibleUnits);
      setData((data: AddToMealPlanType) => {
         return {
            ...data,
            value: {
               ...data.value,
               name: title,
               unit: possibleUnits[0],
               amount: '1',
               image,
               id,
            },
         };
      });
   }, [title]);

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

                  <DialogSelectAmount
                     amount={data.value.amount}
                     handleSelectAmount={handleSelectAmount}
                  />
                  <DialogSelectUnit
                     unit={data.value.unit}
                     handleSelectUnit={handleSelectUnit}
                     possibleUnits={possibleUnits}
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
