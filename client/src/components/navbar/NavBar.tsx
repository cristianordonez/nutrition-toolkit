import React, { useState, useContext } from 'react';
import './Navbar.scss';
import { ColorModeContext } from '../../pages/App';
import { useNavigate } from 'react-router-dom';
import DefaultAvatar from '../../../img/default-avatar.svg';
import { Link } from 'react-router-dom';
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
} from '@mui/material';
import { useAuth } from '../../context/authContext';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useLocation } from 'react-router-dom';
import { MainTitleLogo } from '../main-title-logo/MainTitleLogo';
import { LogoIcon } from '../logo-icon/LogoIcon';

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

   return (
      <AppBar
         position='fixed'
         sx={{
            // zIndex: (theme) => theme.zIndex.drawer + 1,
            boxShadow: 'none',
            background: '#080C24',
            padding: '0 1vw',
            backdropFilter: 'blue(20px)',
         }}
         color='inherit'
         enableColorOnDark={true}
      >
         <Toolbar disableGutters>
            {/* logo that appears at all times*/}
            {/* <Box
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
            ></Box> */}
            {/* title that appears desktop only */}
            {/* <Typography
               variant='h6'
               noWrap
               data-testid='navlink'
               color='text'
               onClick={handleLogout}
               sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  textDecoration: 'none',
                  flexGrow: 1,
                  '&:hover': {
                     cursor: 'pointer',
                  },
               }}
            >
               DiabetesCalculator
            </Typography> */}
            {/* USER IS LOGGED IN */}
            {isLoggedIn === true ? (
               <>
                  {/* MOBILE ONLY */}
                  <Box
                     sx={{
                        flexGrow: 1,
                        display: { xs: 'flex', md: 'none' },
                        paddingLeft: {
                           xs: 0,
                           sm: '350px',
                        },
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
                           display: 'block',
                        }}
                     >
                        <Stack direction='column' sx={{ padding: '0.5rem' }}>
                           {pages.map((page) =>
                              page.toLowerCase().replace(' ', '') ===
                              location.pathname.slice(1) ? (
                                 <Link
                                    onClick={handleCloseNavMenu}
                                    key={page}
                                    // underline='always'
                                    // variant='overline'
                                    // color='inherit'
                                    to={`/${page
                                       .toLowerCase()
                                       .replace(/ /g, '')}`}
                                 >
                                    {page}
                                 </Link>
                              ) : (
                                 <Link
                                    onClick={handleCloseNavMenu}
                                    key={page}
                                    // underline='hover'
                                    // variant='overline'
                                    // color='inherit'
                                    to={`/${page
                                       .toLowerCase()
                                       .replace(/ /g, '')}`}
                                 >
                                    {page}
                                 </Link>
                              )
                           )}
                        </Stack>
                     </Menu>
                     {location.pathname === '/settings' ? (
                        <Button variant='text' onClick={() => history.back()}>
                           Go Back
                        </Button>
                     ) : null}
                  </Box>
                  {/* CONTINUE DESKTOP ONLY */}
                  <Box
                     sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        gap: 4,
                        // justifyContent: 'flex-end',
                        pl: { xs: 0, sm: '350px' },
                        justifyContent: 'center',
                     }}
                  >
                     {/* SHOW ONLY ON SETTINGS PAGE WHEN ON DESKTOP*/}
                     {location.pathname === '/settings' ? (
                        <Button
                           variant='text'
                           color='inherit'
                           onClick={() => history.back()}
                        >
                           Go Back
                        </Button>
                     ) : (
                        // SHOW ON ALL PAGES WHEN ON DESKTOP
                        pages.map((page) =>
                           page.toLowerCase().replace(' ', '') ===
                           location.pathname.slice(1) ? (
                              <Link
                                 key={page}
                                 // underline='always'
                                 // variant='overline'
                                 // color='inherit'
                                 to={`/${page.toLowerCase().replace(/ /g, '')}`}
                              >
                                 {page}
                              </Link>
                           ) : (
                              <Link
                                 key={page}
                                 // underline='hover'
                                 // variant='overline'
                                 // color='inherit'
                                 to={`/${page.toLowerCase().replace(/ /g, '')}`}
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
            {isLoading === false &&
            isLoggedIn === false &&
            location.pathname === '/' ? (
               <Stack
                  direction='row'
                  spacing={1}
                  justifyContent={'center'}
                  alignItems='center'
                  marginRight={1}
               >
                  <LogoIcon />
                  <MainTitleLogo />
               </Stack>
            ) : null}
            {isLoading === false && isLoggedIn === false && (
               <Link
                  to='/login'
                  // underline='hover'
                  data-testid='home-page'
                  className='login-link'
                  // color='inherit'
                  // className='navbar-login'
                  // sx={{
                  //    marginLeft: 'auto',
                  //    position: 'absolute',
                  //    right: '50px',
                  // }}
               >
                  <Typography
                     // color='text'
                     sx={{ fontWeight: '500' }}
                     variant='body2'
                  >
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
