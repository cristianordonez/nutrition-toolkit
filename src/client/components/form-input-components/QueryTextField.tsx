import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import React, { ChangeEventHandler } from 'react';

interface Props {
   query: string;
   handleInputChange: ChangeEventHandler<
      HTMLInputElement | HTMLTextAreaElement
   >;
   helperText: string;
   id: string;
}

export const QueryTextField = ({
   query,
   id,
   handleInputChange,
   helperText,
}: Props) => {
   return (
      <TextField
         id={id}
         required
         data-testid='query-text-field'
         InputProps={{
            startAdornment: (
               <InputAdornment position='start'>
                  <SearchIcon />
               </InputAdornment>
            ),
         }}
         helperText={helperText}
         value={query}
         onChange={handleInputChange}
      />
   );
};
