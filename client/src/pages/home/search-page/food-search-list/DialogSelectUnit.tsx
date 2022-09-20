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
   possibleUnits?: string[] | undefined;
   unit: string;
   handleSelectUnit?: (event: SelectChangeEvent) => void;
}

export const DialogSelectUnit = ({
   possibleUnits,
   handleSelectUnit,
   unit,
}: Props) => {
   return (
      <FormControl>
         <InputLabel>Unit</InputLabel>
         <Select
            value={`${unit}`}
            onChange={handleSelectUnit}
            label='Unit'
            required
            fullWidth
            id='unit'
         >
            {possibleUnits
               ? possibleUnits.map((currentUnit) => (
                    <MenuItem key={currentUnit} value={currentUnit}>
                       {currentUnit}
                    </MenuItem>
                 ))
               : null}
         </Select>
         <FormHelperText>Choose preferred unit type</FormHelperText>
      </FormControl>
   );
};
