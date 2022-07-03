import React, { MouseEventHandler } from 'react';
import {
   Dialog,
   DialogTitle,
   DialogContent,
   TextField,
   Box,
   DialogActions,
   Button,
} from '@mui/material';
import { DatePickerTextField } from './DatePickerTextField';

interface Props {
   openDialog: boolean;
   handleOpeningDialog: MouseEventHandler<HTMLButtonElement>;
}
export const AddToCartModal = ({ openDialog, handleOpeningDialog }: Props) => {
   const handleSubmit = () => {};
   return (
      <Dialog open={openDialog}>
         <DialogTitle>Enter custom calorie and carbohydrate</DialogTitle>
         <form>
            <DialogContent>
               <Box display='flex' flexDirection='column' gap='10px'>
                  <DatePickerTextField />
                  {/* <TextField
                     required
                     name='total_CHO'
                     // onChange={this.handleChange}
                     type='number'
                     label='Carbohydrates'
                     placeholder='Enter carbohydrate goal'
                  ></TextField> */}
               </Box>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleOpeningDialog}>Cancel</Button>
               <Button type='submit'>Submit</Button>
            </DialogActions>
         </form>
      </Dialog>
   );
};
