import React from 'react';

import {
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   SelectChangeEvent,
} from '@mui/material';

interface Props {
   handleSelectChange: (event: SelectChangeEvent) => void;

   servingSizeUnit: string;
}

const servingSizeUnits = ['g', 'mL'];

export const ServingSizeUnitInput = ({
   handleSelectChange,
   servingSizeUnit,
}: Props) => {
   return (
      <FormControl sx={{ width: '100%' }}>
         <InputLabel>Unit</InputLabel>
         <Select
            value={servingSizeUnit}
            onChange={handleSelectChange}
            label='Serving Size Unit'
            required
            fullWidth
            id='serving_size_unit'
         >
            {servingSizeUnits.map((unit) => (
               <MenuItem key={unit} value={unit}>
                  {unit}
               </MenuItem>
            ))}
         </Select>
      </FormControl>
   );
};
