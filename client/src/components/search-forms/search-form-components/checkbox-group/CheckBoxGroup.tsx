import {
   Box,
   FormControl,
   FormGroup,
   FormHelperText,
   Typography,
} from '@mui/material';
import React from 'react';
import { Allergies } from '../../../../../../types/types';
import { CheckBoxItem } from './CheckBoxItem';

interface Props {
   allergies: Allergies;
   handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckBoxGroup = ({ allergies, handleCheckboxChange }: Props) => {
   return (
      <>
         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6'>Allergens</Typography>
            <FormControl component='fieldset' variant='standard'>
               <FormGroup
                  row={true}
                  sx={{
                     display: 'flex',
                     gap: '1rem',
                  }}
               >
                  {Object.entries(allergies).map(
                     ([allergen, isChecked], index) => (
                        <CheckBoxItem
                           key={allergen}
                           allergen={allergen}
                           isChecked={isChecked}
                           handleCheckboxChange={handleCheckboxChange}
                        />
                     )
                  )}
               </FormGroup>
               <FormHelperText>
                  Will search for foods that do not contain your selected
                  allergens
               </FormHelperText>
            </FormControl>
         </Box>
      </>
   );
};
