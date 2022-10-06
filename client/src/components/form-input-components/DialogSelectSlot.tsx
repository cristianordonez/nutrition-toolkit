import { SelectChangeEvent } from '@mui/material/Select';

import {
   Divider,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   Stack,
   Typography,
} from '@mui/material';
import React from 'react';

const menuItemsArray = [
   { value: 1, name: 'Morning' },
   { value: 2, name: 'Afternoon' },
   { value: 3, name: 'Evening' },
   { value: 4, name: 'Snack' },
];

interface Props {
   slot?: number | undefined;
   handleSelectSlot?: (event: SelectChangeEvent) => void;
}

export const DialogSelectSlot = ({ slot, handleSelectSlot }: Props) => {
   return (
      <>
         <Divider />

         <Stack
            alignItems='center'
            direction={'row'}
            spacing={2}
            sx={{ pl: '1rem', pr: '1rem', width: '100%' }}
         >
            <Typography variant='body2' sx={{ minWidth: '25%' }}>
               Slot
            </Typography>
            <FormControl sx={{ width: '100%' }}>
               <InputLabel>Enter Slot</InputLabel>
               <Select
                  value={`${slot}`}
                  onChange={handleSelectSlot}
                  label='Enter Slot'
                  required
                  fullWidth
                  id='slot'
               >
                  {menuItemsArray.map((item) => (
                     <MenuItem key={item.value} value={item.value}>
                        {item.name}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
         </Stack>
      </>
   );
};
