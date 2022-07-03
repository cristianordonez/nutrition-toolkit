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
   servings?: number | undefined;
   handleSelectServings?: (event: SelectChangeEvent) => void;
}

const menuItemsArray = [
   { value: 1, name: '1' },
   { value: 2, name: '2' },
   { value: 3, name: '3' },
];

export const DialogSelectServings = ({
   servings,
   handleSelectServings,
}: Props) => {
   return (
      <FormControl>
         <InputLabel>Servings</InputLabel>
         <Select
            value={`${servings}`}
            onChange={handleSelectServings}
            label='Servings'
            required
            id='servings'
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
