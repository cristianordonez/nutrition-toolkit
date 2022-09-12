import React from 'react';
import { Typography } from '@mui/material';
import { useAuth } from '../../context/authContext';

export const MainTitle = () => {
   const { isLoading, isLoggedIn, username, handleLogout } = useAuth(); //used to check if data is still being retrieved from database

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
            textDecoration: 'none',
            '&:hover': {
               cursor: 'pointer',
            },
         }}
      >
         DiabetesCalculator
      </Typography>
   );
};
