import React, { useContext } from 'react';
import './Navbar.scss';
import { ColorModeContext } from '../../pages/App';
import { useNavigate } from 'react-router-dom';
import DefaultAvatar from '../../img/default-avatar.svg';
import {
   AppBar,
   Box,
   Toolbar,
   IconButton,
   Typography,
   Menu,
   Avatar,
   Button,
   Tooltip,
   MenuItem,
   Stack,
   Link,
} from '@mui/material';
import { useAuth } from '../../context/authContext';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useLocation } from 'react-router-dom';
import { LogoIcon } from '../main-title-logo/LogoIcon';
import { MainTitleLogo } from '../main-title-logo';

const pages = ['Search', 'Macro Calculator', 'Meal Plan'];

const NavBar = () => {
   const location = useLocation();
   const theme = useTheme();
   const colorMode = useContext(ColorModeContext);
   const navigate = useNavigate();
   const { isLoading, isLoggedIn, username, handleLogout } = useAuth(); //used to check if data is still being retrieved from database

   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
      null
   );
   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
      null
   );

   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleMenuClick = () => {
      setAnchorElUser(null);
   };

   const handleUserProfileClick = () => {
      setAnchorElUser(null);
      navigate('/home/settings');
   };

   return (
      <AppBar
         position='fixed'
         sx={{
            boxShadow: 'none',
            
            padding: '0 1vw',
            backdropFilter: 'blue(20px)',
         }}
         color='transparent'
         enableColorOnDark={true}
      >
         <Toolbar disableGutters>
            {/* USER IS LOGGED IN */}
            <Box sx={{ pl: '1rem', display: { xs: 'flex', sm: 'none' } }}>
               <LogoIcon />
            </Box>

            {location.pathname === '/' ||
            location.pathname === '/login' ||
            location.pathname === '/account-recovery' ||
            location.pathname === '/passwordReset' ? (
               <Box sx={{ pl: '1rem', display: { xs: 'none', sm: 'flex' } }}>
                  <MainTitleLogo />
               </Box>
            ) : null}

            {location.pathname.split('/')[1] ===
            'diabetes-calculator-features' ? (
               <Button
                  sx={{
                     paddingLeft: {
                        xs: 0,
                        sm: '350px',
                     },
                  }}
                  variant='text'
                  onClick={() => navigate(-1)}
               >
                  Go Back
               </Button>
            ) : null}
            {isLoggedIn === true ? (
               <>
                  {/* MOBILE ONLY */}
                  <Box
                     sx={{
                        flexGrow: 1,
                        display: { xs: 'flex', md: 'none' },
                     }}
                  >
                     <IconButton
                        size='large'
                        aria-label='account of current user'
                        aria-controls='menu-appbar'
                        aria-haspopup='true'
                        onClick={handleOpenNavMenu}
                        color='inherit'
                        sx={{
                           paddingLeft: { xs: 0, sm: '350px' },
                        }}
                     >
                        <MenuIcon />
                     </IconButton>
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
                           display: 'block',
                        }}
                     >
                        <Stack direction='column' sx={{ padding: '0.5rem' }}>
                           {pages.map((page) => (
                              <Link
                                 onClick={handleCloseNavMenu}
                                 underline='none'
                                 component={NavLink}
                                 sx={{
                                    '&.active': {
                                       color: 'inherit',
                                    },
                                 }}
                                 key={page}
                                 to={`/home/${page
                                    .toLowerCase()
                                    .replace(/ /g, '')}`}
                              >
                                 {page}
                              </Link>
                           ))}
                        </Stack>
                     </Menu>

                     {location.pathname === '/settings' ? (
                        <Button variant='text' onClick={() => navigate(-1)}>
                           Go Back
                        </Button>
                     ) : null}
                  </Box>
                  {/* END MOBILE ONLY */}
                  {/* DESKTOP ONLY */}
                  <Box
                     sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        gap: 4,
                        pl: { xs: 0, sm: '350px' },
                        justifyContent: 'center',
                     }}
                  >
                     {/* SHOW ONLY ON SETTINGS PAGE WHEN ON DESKTOP AND LOGGED IN*/}
                     {location.pathname === '/home/settings' ? (
                        <Button
                           variant='text'
                           color='inherit'
                           onClick={() => navigate(-1)}
                        >
                           Go Back
                        </Button>
                     ) : (
                        // SHOW ON ALL PAGES WHEN ON DESKTOP AND LOGGED IN
                        pages.map((page) => (
                           <Link
                              component={NavLink}
                              key={page}
                              sx={{
                                 '&.active': {
                                    color: 'inherit',
                                 },
                              }}
                              underline='none'
                              to={`/home/${page
                                 .toLowerCase()
                                 .replace(/ /g, '')}`}
                              end
                           >
                              {page}
                           </Link>
                        ))
                     )}
                  </Box>
                  {/* SHOW THIS ON ALL PAGES WHEN LOGGED IN */}
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
                        keepMounted
                        transformOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleMenuClick}
                     >
                        <MenuItem onClick={handleUserProfileClick}>
                           <Typography textAlign='center'>
                              User Profile
                           </Typography>
                        </MenuItem>
                        <MenuItem
                           onClick={handleLogout}
                           data-testid='logout-btn'
                        >
                           <Typography textAlign='center'>Logout</Typography>
                        </MenuItem>
                     </Menu>
                  </Box>
               </>
            ) : (
               // END USER IS LOGGED IN
               <Link
                  component={NavLink}
                  to='/login'
                  color='inherit'
                  sx={{ marginLeft: 'auto' }}
                  underline='none'
                  data-testid='home-page'
               >
                  <Typography sx={{ fontWeight: '500' }} variant='body2'>
                     Log in
                  </Typography>
               </Link>
            )}

            <Tooltip title='Toggle theme'>
               <IconButton
                  sx={{ ml: '1rem' }}
                  onClick={colorMode.toggleColorMode}
                  color='inherit'
                  aria-label='Toggle color theme'
               >
                  {theme.palette.mode === 'dark' ? (
                     <Brightness7Icon />
                  ) : (
                     <Brightness4Icon />
                  )}
               </IconButton>
            </Tooltip>
         </Toolbar>
      </AppBar>
   );
};

export default NavBar;
