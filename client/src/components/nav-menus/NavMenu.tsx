import React from 'react';
import { useAuth } from '../../context/authContext';

import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Link, Menu, Stack } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

const pages = ['Search', 'Macro Calculator'];

export const NavMenu = () => {
   const navigate = useNavigate();
   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
      null
   );
   const { isLoading, isLoggedIn, handleLogout } = useAuth(); //used to check if data is still being retrieved from database

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
   };

   return (
      <>
         <IconButton
            size='large'
            color='inherit'
            aria-label='navigation'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
         >
            <MenuIcon />
         </IconButton>
         {/* HERE ************ */}
         <Menu
            id='menu-appbar'
            anchorEl={anchorElNav}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
               vertical: 'top',
               horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
               display: { xs: 'block', md: 'none' },
            }}
         >
            <Stack direction='column' sx={{ padding: '0.5rem' }}>
               <Link
                  onClick={handleCloseNavMenu}
                  component={NavLink}
                  sx={{
                     '&.active': {
                        color: 'inherit',
                        textDecoration: 'underline',
                     },
                  }}
                  underline='none'
                  to={`/home`}
                  end
               >
                  Meal Plan
               </Link>
               {pages.map((page) => (
                  <Link
                     onClick={handleCloseNavMenu}
                     underline='none'
                     component={NavLink}
                     sx={{
                        '&.active': {
                           color: 'inherit',
                           textDecoration: 'underline',
                        },
                     }}
                     key={page}
                     to={`/home/${page.toLowerCase().replace(/ /g, '')}`}
                  >
                     {page}
                  </Link>
               ))}
            </Stack>
         </Menu>
      </>
   );
};
