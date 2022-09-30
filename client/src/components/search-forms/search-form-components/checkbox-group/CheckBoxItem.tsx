import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';

interface Props {
   allergen: string;
   isChecked: boolean;
   handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckBoxItem = ({
   isChecked,
   allergen,
   handleCheckboxChange,
}: Props) => {
   const label = (
      allergen.slice(0, 1).toUpperCase() + allergen.slice(1)
   ).replace('_', ' ');
   return (
      <>
         <FormControlLabel
            control={
               <Checkbox
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  name={allergen}
               />
            }
            label={label}
         />
      </>
   );
};
