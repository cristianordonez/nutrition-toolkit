import React, { useState, useContext } from 'react';
import { ColorModeContext } from '../../pages/App';
import { useNavigate } from 'react-router-dom';
import DefaultAvatar from '../../../img/default-avatar.svg';
import LOGO from '../../../img/LOGO.svg';
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
   Link,
   Stack,
} from '@mui/material';
import { useAuth } from '../../context/authContext';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useLocation } from 'react-router-dom';

const pages = ['Search', 'Macro Calculator', 'Meal Plan'];

const NavBar = () => {
   const location = useLocation();
   const theme = useTheme();
   const colorMode = useContext(ColorModeContext);
   const navigate = useNavigate();
   const { isLoading, isLoggedIn, username, handleLogout } = useAuth(); //used to check if data is still being retrieved from database
   const [isOpen, setIsOpen] = useState(false);

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
      navigate('/settings');
   };

   // const handleLogout = async () => {
   //    try {
   //       if (isLoggedIn === true) {
   //          await axios.post('/api/logout');
   //          navigate('/', { state: { loggedOut: true }, replace: true });
   //       } else {
   //          navigate('/');
   //       }
   //    } catch (err) {
   //       console.log('err:', err);
   //    }
   // };

   //todo add useEffect hook that replaces navigate found in authcontext
   // if (isLoading) {
   //    return (
   //       <AppBar
   //          position='fixed'
   //          sx={{
   //             zIndex: (theme) => theme.zIndex.drawer + 1,
   //             boxShadow: 'none',
   //             padding: '0 1vw',
   //          }}
   //          color='default'
   //          enableColorOnDark={true}
   //       >
   //          <Toolbar disableGutters>
   //             <Box
   //                component='img'
   //                src={LOGO}
   //                alt='Logo'
   //                sx={{
   //                   display: { md: 'flex' },
   //                   mr: 1,
   //                   objectFit: 'contain',
   //                   height: '2.5rem',
   //                   '&:hover': {
   //                      cursor: 'pointer',
   //                   },
   //                }}
   //                onClick={handleLogout}
   //             ></Box>
   //             <Tooltip title='Toggle theme'>
   //                <IconButton
   //                   sx={{ ml: 'auto' }}
   //                   onClick={colorMode.toggleColorMode}
   //                   color='inherit'
   //                   aria-label='Toggle color theme'
   //                >
   //                   {theme.palette.mode === 'dark' ? (
   //                      <Brightness7Icon />
   //                   ) : (
   //                      <Brightness4Icon />
   //                   )}
   //                </IconButton>
   //             </Tooltip>
   //          </Toolbar>
   //       </AppBar>
   //    );
   // } else {
   return (
      <AppBar
         position='fixed'
         sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            boxShadow: 'none',
            padding: '0 1vw',
         }}
         color='default'
         enableColorOnDark={true}
      >
         <Toolbar disableGutters>
            {/* logo that appears at all times*/}
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
            {/* title that appears desktop only */}
            <Typography
               variant='h6'
               noWrap
               data-testid='navlink'
               onClick={handleLogout}
               sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  '&:hover': {
                     cursor: 'pointer',
                  },
               }}
            >
               DiabetesCalculator
            </Typography>
            {/* USER IS LOGGED IN */}
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
                           display: {
                              xs: 'block',
                              md: 'none',
                           },
                        }}
                     >
                        <Stack direction='column' sx={{ padding: '0.5rem' }}>
                           {pages.map((page) =>
                              page.toLowerCase().replace(' ', '') ===
                              location.pathname.slice(1) ? (
                                 <Link
                                    onClick={handleCloseNavMenu}
                                    key={page}
                                    underline='hover'
                                    variant='overline'
                                    href={`/${page
                                       .toLowerCase()
                                       .replace(/ /g, '')}`}
                                 >
                                    {page}
                                 </Link>
                              ) : (
                                 <Link
                                    onClick={handleCloseNavMenu}
                                    key={page}
                                    underline='hover'
                                    variant='overline'
                                    color='secondary'
                                    href={`/${page
                                       .toLowerCase()
                                       .replace(/ /g, '')}`}
                                 >
                                    {page}
                                 </Link>
                              )
                           )}
                        </Stack>
                     </Menu>
                  </Box>
                  {/* CONTINUE DESKTOP ONLY */}
                  <Box
                     sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        gap: 2,
                     }}
                  >
                     {/* SHOW ONLY ON SETTINGS PAGE WHEN ON DESKTOP*/}
                     {location.pathname === '/settings' ? (
                        <Button variant='text' onClick={() => history.back()}>
                           Go Back
                        </Button>
                     ) : (
                        // SHOW ON ALL PAGES WHEN ON DESKTOP
                        pages.map((page) =>
                           page.toLowerCase().replace(' ', '') ===
                           location.pathname.slice(1) ? (
                              <Link
                                 key={page}
                                 underline='hover'
                                 variant='overline'
                                 href={`/${page
                                    .toLowerCase()
                                    .replace(/ /g, '')}`}
                              >
                                 {page}
                              </Link>
                           ) : (
                              <Link
                                 key={page}
                                 underline='hover'
                                 variant='overline'
                                 color='secondary'
                                 href={`/${page
                                    .toLowerCase()
                                    .replace(/ /g, '')}`}
                              >
                                 {page}
                              </Link>
                           )
                        )
                     )}
                  </Box>
                  {/* SHOW THIS ON ALL PAGES */}
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
            ) : // END USER IS LOGGED IN
            null}
            {isLoading === false && isLoggedIn === false && (
               <Link
                  href='/login'
                  underline='hover'
                  data-testid='home-page'
                  className='navbar-login'
                  sx={{
                     marginLeft: 'auto',
                     position: 'absolute',
                     right: '50px',
                  }}
               >
                  <Typography sx={{ fontWeight: '500' }} variant='body2'>
                     Log in
                  </Typography>
               </Link>
            )}
            <Tooltip title='Toggle theme'>
               <IconButton
                  sx={{ ml: 'auto' }}
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
