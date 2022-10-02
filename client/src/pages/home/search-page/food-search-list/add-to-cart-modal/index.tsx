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
import { format } from 'date-fns';
import startOfToday from 'date-fns/startOfToday';
import React, {
   Dispatch,
   MouseEventHandler,
   SetStateAction,
   SyntheticEvent,
   useEffect,
   useState,
} from 'react';
import { AddToMealPlanType } from '../../../../../../../types/types';
import { DatePickerTextField } from './DatePickerTextField';
import { DialogSelectServingSize } from './DialogSelectServingSize';
import { DialogSelectSlot } from './DialogSelectSlot';
import { DialogServingsInput } from './DialogServingsInput';

interface Props {
   openDialog: boolean;
   handleOpeningDialog: MouseEventHandler<HTMLButtonElement>;
   id: number;
   currentDataType: string;
   currentServingSizes: number[];
   currentServingSizeUnit: string;
   currentTitle: string;
   currentIngredients: string;
   setOpenDialog: Dispatch<SetStateAction<boolean>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setOpenSnackbar: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
}

export const AddToCartModal = ({
   openDialog,
   handleOpeningDialog,
   id,
   currentDataType,
   currentServingSizes,
   currentServingSizeUnit,
   currentTitle,
   currentIngredients,
   setOpenDialog,
   setAlertMessage,
   setOpenSnackbar,
   setAlertSeverity,
}: Props) => {
   const [data, setData] = useState<AddToMealPlanType>({
      date: format(startOfToday(), 'yyyy-MM-dd'),
      slot: 1,
      fdc_id: id,
      servings: '',
      data_type: currentDataType,
      serving_size: currentServingSizes[0],
      serving_size_unit: currentServingSizeUnit,
      title: currentTitle,
      ingredients: currentIngredients,
   });

   const handleSelectSlot = (event: SelectChangeEvent) => {
      setData({ ...data, slot: parseInt(event.target.value) as 1 | 2 | 3 | 4 });
   };

   const handleSelectServingSize = (event: SelectChangeEvent) => {
      setData({ ...data, serving_size: parseInt(event.target.value) });
   };

   const handleSelectServings = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setData((data: AddToMealPlanType) => {
         return {
            ...data,
            servings: event.target.value,
         };
      });
   };

   const handleSubmit = async (event: SyntheticEvent) => {
      try {
         event.preventDefault();
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
      setData({
         ...data,
         fdc_id: id,
         servings: 1.0,
         data_type: currentDataType,
         serving_size: currentServingSizes[0],
         serving_size_unit: currentServingSizeUnit,
         slot: 1,
         date: format(startOfToday(), 'yyyy-MM-dd'),
         title: currentTitle,
         ingredients: currentIngredients,
      });
   }, [id]);

   const handleClose = (value: string) => {
      setOpenDialog(false);
   };

   return (
      <Dialog
         open={openDialog}
         onClose={() => {
            handleClose('backdropClick');
         }}
      >
         <DialogTitle align='left'>Add item to mealplan</DialogTitle>
         <form onSubmit={handleSubmit}>
            <DialogContent>
               <Box display='flex' flexDirection='column' gap='1rem'>
                  <DatePickerTextField setData={setData} data={data} />
                  <DialogSelectSlot
                     handleSelectSlot={handleSelectSlot}
                     slot={data.slot}
                  />
                  <DialogSelectServingSize
                     servingSize={data.serving_size}
                     handleSelectServingSize={handleSelectServingSize}
                     currentServingSizes={currentServingSizes}
                     currentServingSizeUnit={currentServingSizeUnit}
                  />
                  <DialogServingsInput
                     handleSelectServings={handleSelectServings}
                     servings={data.servings}
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
