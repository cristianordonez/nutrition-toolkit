import { Typography } from '@mui/material';
import React from 'react';
import { useAuth } from '../../context/authContext';

export const MainTitle = () => {
   const { handleLogout } = useAuth(); //used to check if data is still being retrieved from database

   return (
      <Typography
         variant='h6'
         noWrap
         data-testid='navlink'
         color='text'
         onClick={handleLogout}
         sx={{
            fontWeight: 700,
            letterSpacing: '.3rem',
            fontFamily: 'Lato',
            textDecoration: 'none',
            '&:hover': {
               cursor: 'pointer',
            },
         }}
      >
         MacroTrainer
      </Typography>
   );
};
