import React from 'react';
import { Box } from '@mui/material';
import LOGO from '../../img/logo.svg';
import { useAuth } from '../../context/authContext';

export const LogoIcon = () => {
   const { isLoading, isLoggedIn, username, handleLogout } = useAuth(); //used to check if data is still being retrieved from database

   return (
      <Box
         component='img'
         src={LOGO}
         alt='Logo'
         sx={{
            display: { md: 'flex' },
            mr: 1,
            objectFit: 'contain',
            height: '2.5rem',
            '&:hover': {
               cursor: 'pointer',
            },
         }}
         onClick={handleLogout}
      ></Box>
   );
};
