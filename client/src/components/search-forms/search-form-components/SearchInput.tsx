import React from 'react';
import {
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   FormHelperText,
} from '@mui/material';

interface Props {
   route: string;
   handleRouteChange: any;
}
export const SearchInput = ({ route, handleRouteChange }: Props) => {
   return (
      <FormControl>
         <InputLabel>Search</InputLabel>
         <Select
            value={route}
            onChange={handleRouteChange}
            label='Search'
            required
            data-testid='select-search-input'
         >
            <MenuItem value={'recipes'}>Recipes</MenuItem>
            <MenuItem value={'groceryProducts'}>Grocery Products</MenuItem>
            <MenuItem value={'menuItems'}>Menu items</MenuItem>
            <MenuItem value={'ingredients'}>Ingredients</MenuItem>
         </Select>
         <FormHelperText>
            Choose the type of item you are searching for.
         </FormHelperText>
      </FormControl>
   );
};
