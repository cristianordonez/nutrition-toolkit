import React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

import {
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   FormHelperText,
} from '@mui/material';

interface Props {
   amount?: number | undefined;
   handleSelectAmount?: (event: SelectChangeEvent) => void;
}

type SelectValues = { value: number; name: string };
const menuItemsArray = [] as unknown as SelectValues[];

for (let i = 1; i < 21; i++) {
   menuItemsArray.push({ value: i, name: i + '' });
}

export const DialogSelectAmount = ({ amount, handleSelectAmount }: Props) => {
   return (
      <FormControl>
         <InputLabel>Amount</InputLabel>
         <Select
            value={`${amount}`}
            onChange={handleSelectAmount}
            label='Amount'
            required
            id='amount'
            fullWidth
            sx={{ width: '100%' }}
         >
            {menuItemsArray.map((item) => (
               <MenuItem key={item.value} value={item.value}>
                  {item.name}
               </MenuItem>
            ))}
         </Select>
         <FormHelperText>Choose number of servings</FormHelperText>
      </FormControl>
   );
};
