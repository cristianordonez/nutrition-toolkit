import React from 'react';
import { TextField, InputProps, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
   query: string;
   handleInputChange: any;
}

export const QueryTextField = ({ query, handleInputChange }: Props) => {
   console.log('handleInputChange:', handleInputChange);
   return (
      <TextField
         id='query'
         required
         InputProps={{
            startAdornment: (
               <InputAdornment position='start'>
                  <SearchIcon />
               </InputAdornment>
            ),
         }}
         label='Item'
         helperText='Enter an ingredient or item you want your search to contain (i.e. chicken, greek yogurt, etc.)'
         value={query}
         onChange={handleInputChange}
      />
   );
};
