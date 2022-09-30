import {
   FormControl,
   FormHelperText,
   InputLabel,
   MenuItem,
   Select,
} from '@mui/material';
import React from 'react';

interface Props {
   type: string;
   handleTypeSelect: any;
}
export const CategoryDropDown = ({ type, handleTypeSelect }: Props) => {
   return (
      <FormControl>
         <InputLabel>Category</InputLabel>
         <Select
            value={type}
            onChange={handleTypeSelect}
            label='Type'
            required
            id='type'
            data-testid='select-type-dropdown'
         >
            <MenuItem value={'all'}>All</MenuItem>
            <MenuItem value={'beverage'}>Beverage</MenuItem>
            <MenuItem value={'dessert'}>Dessert</MenuItem>
            <MenuItem value={'breakfast'}>Breakfast</MenuItem>
            <MenuItem value={'snack'}>Snack</MenuItem>
            <MenuItem value={'maincourse'}>Main Course</MenuItem>
         </Select>
         <FormHelperText>
            Narrow down your search by choosing a food category
         </FormHelperText>
      </FormControl>
   );
};
