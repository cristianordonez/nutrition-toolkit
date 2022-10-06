import { Divider, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
interface Props {
   inputValue: string;
   handleInputChange: React.ChangeEventHandler;
   title: 'Brand owner' | 'Description';
   id: string;
   textFieldError: boolean;
}

export const CreateFoodTextInput = ({
   inputValue,
   handleInputChange,
   title,
   id,
   textFieldError,
}: Props) => {
   return (
      <>
         <Divider />
         <Stack
            alignItems='center'
            direction={'row'}
            spacing={2}
            sx={{ pl: '1rem', pr: '1rem' }}
         >
            <Typography sx={{ minWidth: '25%' }} variant='body2'>
               {title}
            </Typography>
            <TextField
               sx={{ flexGrow: '1' }}
               id={id}
               error={textFieldError}
               label={title === 'Brand owner' ? 'Optional' : 'Required'}
               value={inputValue}
               required={title === 'Brand owner' ? false : true}
               onChange={handleInputChange}
            />
         </Stack>
      </>
   );
};
