import React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

import {
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   FormHelperText,
} from '@mui/material';

const menuItemsArray = [
   { value: 1, name: 'Breakfast' },
   { value: 2, name: 'Lunch' },
   { value: 3, name: 'Dinner' },
];

interface Props {
   slot?: number | undefined;
   handleSelectSlot?: (event: SelectChangeEvent) => void;
}

export const DialogSelectSlot = ({ slot, handleSelectSlot }: Props) => {
   return (
      <FormControl>
         <InputLabel>Slot</InputLabel>
         <Select
            value={`${slot}`}
            onChange={handleSelectSlot}
            label='Slot'
            required
            id='slot'
         >
            {menuItemsArray.map((item) => (
               <MenuItem key={item.value} value={item.value}>
                  {item.name}
               </MenuItem>
            ))}
         </Select>
         <FormHelperText>Choose correct slot for chose day</FormHelperText>
      </FormControl>
   );
};
