import React, { MouseEventHandler, useState } from 'react';
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
} from '@mui/material';
import { DatePickerTextField } from './DatePickerTextField';
import { MealPlanInterface } from '../../../../server/API/types'; //interface from api handler
import axios from 'axios';
import getUnixTime from 'date-fns/getUnixTime';

interface Props {
   openDialog: boolean;
   handleOpeningDialog: MouseEventHandler<HTMLButtonElement>;
   route: string;
   imageType: string;
   title: string;
   id: number;
}

export const AddToCartModal = ({
   openDialog,
   handleOpeningDialog,
   route,
   imageType,
   title,
   id,
}: Props) => {
   let currentType;
   if (route === 'recipes') {
      currentType = 'RECIPE';
   } else if (route === 'groceryProducts') {
      currentType = 'PRODUCT';
   } else {
      currentType = 'MENU_ITEM';
   }

   const [data, setData] = useState<MealPlanInterface>({
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

   console.log('data:', data);

   //todo get slot either 1 2 or 3 and update state
   //todo update servings from textfield
   const slotItems = [
      { value: 1, name: 'Breakfast' },
      { value: 2, name: 'Lunch' },
      { value: 3, name: 'Dinner' },
   ];

   const handleSubmit = () => {};

   const handleSelectSlot = (event: SelectChangeEvent) => {
      setData({ ...data, slot: parseInt(event.target.value) });
   };

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

   return (
      <Dialog open={openDialog}>
         <DialogTitle>Enter custom calorie and carbohydrate</DialogTitle>
         <form>
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
               <Button type='submit'>Submit</Button>
            </DialogActions>
         </form>
      </Dialog>
   );
};
