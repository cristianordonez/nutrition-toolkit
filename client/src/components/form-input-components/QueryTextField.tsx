import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

interface Props {
   query: string;
   handleInputChange: any;
}

export const QueryTextField = ({ query, handleInputChange }: Props) => {
   return (
      <TextField
         id='query'
         required
         data-testid='query-text-field'
         InputProps={{
            startAdornment: (
               <InputAdornment position='start'>
                  <SearchIcon />
               </InputAdornment>
            ),
         }}
         label='Item'
         helperText='Search for a food'
         value={query}
         onChange={handleInputChange}
      />
   );
};
