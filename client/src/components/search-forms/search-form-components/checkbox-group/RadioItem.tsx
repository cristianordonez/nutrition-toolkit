import { FormControlLabel, Radio } from '@mui/material';
import React from 'react';

interface Props {
   allergen: string;
   handleRadioClick: any;
}

export const RadioItem = ({ allergen, handleRadioClick }: Props) => {
   const label = (
      allergen.slice(0, 1).toUpperCase() + allergen.slice(1)
   ).replace('_', ' ');
   return (
      <>
         <FormControlLabel
            control={<Radio onClick={handleRadioClick} />}
            label={label}
            value={allergen}
         />
      </>
   );
};
