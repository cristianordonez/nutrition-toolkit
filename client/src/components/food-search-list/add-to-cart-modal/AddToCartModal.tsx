import {
   AlertColor,
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Divider,
   Stack,
   Typography,
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
import { AddToMealPlanType } from '../../../../../types/types';
import { DatePickerTextField } from '../../form-input-components/DatePickerTextField';
import { DialogSelectServingSize } from '../../form-input-components/DialogSelectServingSize';
import { DialogSelectSlot } from '../../form-input-components/DialogSelectSlot';
import { FormNumberInput } from '../../form-input-components/FormNumberInput';

interface Props {
   openDialog: boolean;
   handleOpeningDialog: MouseEventHandler<HTMLButtonElement>;
   id: number;
   currentDataType: string;
   currentModifier: string | null | undefined;
   currentServingSizes: number[];
   currentServingSizeUnit: string;
   currentDescription: string;
   currentBrand: string;
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
   currentModifier,
   currentServingSizeUnit,
   currentDescription,
   currentBrand,
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
      description: currentDescription,
      brand_owner: currentBrand,
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
         description: currentDescription,
         brand_owner: currentBrand,
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
            <DialogContent sx={{ p: 0, width: '100%' }}>
               <Box display='flex' flexDirection='column' gap='10px'>
                  <Divider />
                  <Stack
                     spacing={2}
                     direction={'row'}
                     alignItems='center'
                     sx={{ pl: '1rem', pr: '1rem' }}
                  >
                     <Typography sx={{ minWidth: '25%' }} variant='body2'>
                        Date{' '}
                     </Typography>
                     <DatePickerTextField setData={setData} data={data} />
                  </Stack>
                  <DialogSelectSlot
                     handleSelectSlot={handleSelectSlot}
                     slot={data.slot}
                  />
                  <DialogSelectServingSize
                     servingSize={data.serving_size}
                     handleSelectServingSize={handleSelectServingSize}
                     currentServingSizes={currentServingSizes}
                     currentServingSizeUnit={currentServingSizeUnit}
                     currentModifier={currentModifier}
                  />
                  <Divider />
                  <Stack
                     spacing={2}
                     direction={'row'}
                     alignItems='center'
                     sx={{ pl: '1rem', pr: '1rem' }}
                  >
                     <Typography sx={{ minWidth: '25%' }} variant='body2'>
                        Number of servings
                     </Typography>
                     <FormNumberInput
                        inputValue={data.servings}
                        handleNumberChange={handleSelectServings}
                        label='Enter Number of Servings'
                        id={'servings'}
                     />
                  </Stack>
               </Box>
            </DialogContent>
            <DialogActions>
               <Button
                  variant='contained'
                  aria-label='cancel'
                  onClick={handleOpeningDialog}
                  color='error'
               >
                  Cancel
               </Button>
               <Button
                  data-testid='add-mealplan-btn'
                  aria-label='submit form to add to meal plan'
                  type='submit'
                  variant='contained'
                  color='success'
               >
                  Submit
               </Button>
            </DialogActions>
         </form>
      </Dialog>
   );
};
