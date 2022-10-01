import {
   Box,
   FormControl,
   FormHelperText,
   RadioGroup,
   Typography,
} from '@mui/material';
import React, { MouseEventHandler } from 'react';
import { RadioItem } from './RadioItem';

interface Props {
   allergy: string;
   handleRadioClick: MouseEventHandler<HTMLInputElement>;
}

const allergies = [
   'dairy',
   'eggs',
   'soy',
   'tree_nuts',
   'peanuts',
   'shellfish',
   'fish',
   'wheat',
];
export const RadioAllergyGroup = ({ allergy, handleRadioClick }: Props) => {
   return (
      <>
         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6'>Allergens</Typography>
            <FormControl>
               <RadioGroup
                  row={true}
                  sx={{
                     display: 'flex',
                     gap: '1rem',
                  }}
                  value={allergy}
               >
                  {allergies.map((allergen, index) => (
                     <RadioItem
                        handleRadioClick={handleRadioClick}
                        key={allergen}
                        allergen={allergen}
                     />
                  ))}
               </RadioGroup>
               <FormHelperText>
                  Leave all options unselected if you do not have any allergies
               </FormHelperText>
            </FormControl>
         </Box>
      </>
   );
};
