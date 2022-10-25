import React from 'react';
import { useAuth } from '../../context/authContext';
import DefaultAvatar from '../../img/default-avatar.svg';

import {
   Avatar,
   Box,
   IconButton,
   Menu,
   MenuItem,
   Tooltip,
   Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const UserMenu = () => {
   const navigate = useNavigate();
   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>();
   const { handleLogout } = useAuth(); //used to check if data is still being retrieved from database

   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
   };
   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };
   const handleUserProfileClick = () => {
      navigate('/home/settings');
   };
   return (
      <Box sx={{ flexGrow: 0 }}>
         <Tooltip title='Open settings'>
            <IconButton
               onClick={handleOpenUserMenu}
               sx={{ p: 0 }}
               data-testid='avatar'
            >
               <Avatar alt='user avatar' src={DefaultAvatar} />
            </IconButton>
         </Tooltip>
         <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
         >
            <MenuItem onClick={handleUserProfileClick}>
               <Typography textAlign='center'>User Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout} data-testid='logout-btn'>
               <Typography textAlign='center'>Logout</Typography>
            </MenuItem>
         </Menu>
      </Box>
   );
};
