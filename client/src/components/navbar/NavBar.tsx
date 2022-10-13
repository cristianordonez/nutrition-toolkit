import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {
   AppBar,
   Box,
   Button,
   IconButton,
   Link,
   Toolbar,
   Tooltip,
   Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { ColorModeContext } from '../../pages/App';
import { MainTitleLogo } from '../main-title-logo';
import { LogoIcon } from '../main-title-logo/LogoIcon';
import { NavMenu } from '../nav-menus/NavMenu';
import { UserMenu } from '../nav-menus/UserMenu';
import './Navbar.scss';

const pages = ['Search', 'Macro Calculator'];

const NavBar = () => {
   const location = useLocation();
   const theme = useTheme();
   const colorMode = useContext(ColorModeContext);
   const navigate = useNavigate();
   const { isLoading, isLoggedIn, handleLogout } = useAuth(); //used to check if data is still being retrieved from database

   // const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>();

   // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
   //    null
   // );

   // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
   //    setAnchorElNav(event.currentTarget);
   // };

   // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
   //    setAnchorElUser(event.currentTarget);
   // };

   // const handleCloseNavMenu = () => {
   //    setAnchorElNav(null);
   // };

   // const handleCloseUserMenu = () => {
   //    setAnchorElUser(null);
   // };

   // const handleUserProfileClick = () => {
   //    // setAnchorElUser(null);
   //    navigate('/home/settings');
   // };

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
            {/* ONLY ON XS SCREENS */}
            <Box sx={{ pl: '1rem', display: { xs: 'flex', sm: 'none' } }}>
               <LogoIcon />
            </Box>
            {/* ONLY ON SM SCREENS BUT NOT XS OR ABOVE AND ONLY WHEN PAGE IS NOT HOME OR FEATURES*/}
            {location.pathname.split('/')[1] !== 'home' &&
            location.pathname.split('/')[1] !==
               'diabetes-calculator-features' ? (
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
            {isLoggedIn === true && isLoading === false ? (
               <>
                  {/* ON XS, SM AND MD SCREENS */}
                  <Box
                     sx={{
                        flexGrow: 1,
                        display: { xs: 'flex', md: 'none' },
                        paddingLeft: { xs: 0, sm: '350px' },
                     }}
                  >
                     <NavMenu />

                     {location.pathname === '/settings' ? (
                        <Button variant='text' onClick={() => navigate(-1)}>
                           Go Back
                        </Button>
                     ) : null}
                  </Box>
                  {/* ONLY ON MD AND ABOVE SCREENS*/}
                  <Box
                     sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        gap: 4,
                        pl: { xs: 0, sm: '350px' },
                        width: '100%',
                        justifyContent: 'center',
                     }}
                  >
                     {location.pathname === '/home/settings' ? (
                        <Button
                           variant='text'
                           color='inherit'
                           onClick={() => navigate(-1)}
                        >
                           Go Back
                        </Button>
                     ) : (
                        <>
                           <Link
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
                                 component={NavLink}
                                 key={page}
                                 sx={{
                                    '&.active': {
                                       color: 'inherit',
                                       textDecoration: 'underline',
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
                           ))}
                        </>
                     )}
                  </Box>
                  <UserMenu />
                  {/* HERE **** */}
                  {/* <Box sx={{ flexGrow: 0 }}>
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
                  </Box> */}
               </>
            ) : // END USER IS LOGGED IN
            isLoading === false ? (
               <Link
                  component={NavLink}
                  to='/login'
                  color='inherit'
                  sx={{ marginLeft: 'auto', flexGrow: 0, pr: '1rem' }}
                  underline='none'
                  data-testid='home-page'
               >
                  <Typography sx={{ fontWeight: '500' }} variant='body1'>
                     Log in
                  </Typography>
               </Link>
            ) : null}

            <Tooltip title='Toggle theme'>
               <IconButton
                  sx={isLoggedIn ? { ml: 'auto' } : { ml: 0 }}
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
