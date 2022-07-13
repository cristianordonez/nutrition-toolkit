import React from 'react';
import {
   FormControl,
   Select,
   InputLabel,
   MenuItem,
   FormHelperText,
} from '@mui/material';

interface Props {
   type: string;
   handleTypeSelect: any;
}
export const TypeDropDown = ({ type, handleTypeSelect }: Props) => {
   return (
      <FormControl>
         <InputLabel>Type</InputLabel>
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
            Choose the type of item you are searching for.
         </FormHelperText>
      </FormControl>
   );
};
