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
            <MenuItem value={'maincourse'}>Main Course</MenuItem>
            <MenuItem value={'sidedish'}>Side Dish</MenuItem>
            <MenuItem value={'dessert'}>Dessert</MenuItem>
            <MenuItem value={'appetizer'}>Appetizer</MenuItem>
            <MenuItem value={'salad'}>Salad</MenuItem>
            <MenuItem value={'bread'}>Bread</MenuItem>
            <MenuItem value={'breakfast'}>Breakfast</MenuItem>
            <MenuItem value={'soup'}>Soup</MenuItem>
            <MenuItem value={'beverage'}>Beverage</MenuItem>
            <MenuItem value={'sauce'}>Sauce</MenuItem>
            <MenuItem value={'marinade'}>Marinade</MenuItem>
            <MenuItem value={'fingerfood'}>Fingerfood</MenuItem>
            <MenuItem value={'snack'}>Snack</MenuItem>
            <MenuItem value={'drink'}>Drink</MenuItem>
         </Select>
         <FormHelperText>
            Narrow down your search by choosing a food category.
         </FormHelperText>
      </FormControl>
   );
};
