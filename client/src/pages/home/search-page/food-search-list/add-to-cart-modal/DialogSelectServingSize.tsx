import { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';

import {
   FormControl,
   FormHelperText,
   InputLabel,
   MenuItem,
   Select,
} from '@mui/material';

interface Props {
   handleSelectServingSize?: (event: SelectChangeEvent) => void;
   servingSize: number;
   currentServingSizes: number[];
   currentServingSizeUnit: string;
}

export const DialogSelectServingSize = ({
   handleSelectServingSize,
   currentServingSizes: currentServingSizes,
   servingSize,
   currentServingSizeUnit,
}: Props) => {
   return (
      <FormControl>
         <InputLabel>Serving Size</InputLabel>
         <Select
            value={servingSize + ''}
            onChange={handleSelectServingSize}
            label='Serving Size'
            required
            fullWidth
            id='unit'
         >
            {currentServingSizes.map((size) =>
               size === 100 ? (
                  <MenuItem key={size} value={size}>
                     {size} {currentServingSizeUnit} (standardized serving size)
                  </MenuItem>
               ) : (
                  <MenuItem key={size} value={size}>
                     {size} {currentServingSizeUnit} (serving size as seen on
                     nutrition label)
                  </MenuItem>
               )
            )}
         </Select>
         <FormHelperText>Choose serving size </FormHelperText>
      </FormControl>
   );
};
