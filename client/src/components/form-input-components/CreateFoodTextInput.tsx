import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

interface Props {
   inputValue: string;
   handleInputChange: React.ChangeEventHandler;
   title: 'Brand name' | 'Description';
   id: string;
}

export const CreateFoodTextInput = ({
   inputValue,
   handleInputChange,
   title,
   id,
}: Props) => {
   return (
      <TextField
         required
         id={id}
         InputProps={{
            startAdornment: (
               <InputAdornment position='start'>
                  <SearchIcon />
               </InputAdornment>
            ),
         }}
         label={title}
         helperText={`Enter ${title}`}
         value={inputValue}
         onChange={handleInputChange}
      />
   );
};
