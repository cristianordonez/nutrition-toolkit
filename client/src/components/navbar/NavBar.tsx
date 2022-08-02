import React, { MouseEventHandler, useState, useContext } from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import {
   AppBar,
   Box,
   Toolbar,
   IconButton,
   Typography,
   Menu,
   Container,
   Avatar,
   Button,
   Tooltip,
   MenuItem,
   Icon,
   Link,
   List,
   ListItem,
   ListItemText,
   Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
// import { Link } from 'react-router-dom';
import LOGO from '../../../img/LOGO.svg';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { ColorModeContext } from '../../pages/App';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useLocation } from 'react-router-dom';
const pages = ['Search', 'Macro Calculator', 'Meal Plan'];

interface Props {
   isLoggedIn: boolean;
   isSettingsPage?: boolean;
}

const NavBar = ({ isLoggedIn, isSettingsPage }: Props) => {
   const location = useLocation();

   //! setting the theme here
   const theme = useTheme();
   const colorMode = useContext(ColorModeContext);

   ///////////////////////////////////

   const navigate = useNavigate();
   const isLoading = useAuth(); //used to check if data is still being retrieved from database

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

   const handleLogout = async () => {
      try {
         let response = await axios.post('/api/logout');
         navigate('/');
      } catch (err) {
         console.log('err:', err);
      }
   };

   const handleNavigateToHome = () => {
      navigate('/');
   };

   // if (location.pathname)
   console.log('colorMode: ', colorMode);
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
         {/* <Container maxWidth='xl'> */}
         <Toolbar disableGutters>
            {/* MOBILE DESKTOP*/}
            {/* <MenuBookIcon sx={{ display: { md: 'flex' }, mr: 1 }} /> */}
            <Box
               component='img'
               src={LOGO}
               sx={{
                  display: { md: 'flex' },
                  // flexGrow: { xs: '1', md: '0' },
                  mr: 1,
                  objectFit: 'contain',
                  height: '2.5rem',
               }}
               onClick={handleNavigateToHome}
            ></Box>
            <Typography
               variant='h6'
               noWrap
               data-testid='navlink'
               component='a'
               href='/'
               sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  // fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  flexGrow: 1,
               }}
            >
               DiabetesCoach
            </Typography>
            {isLoggedIn === true ? (
               <>
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
                           display: { xs: 'block', md: 'none' },
                        }}
                     >
                        <Stack direction='column'>
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
                  <Box
                     sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        gap: 2,
                     }}
                  >
                     {isSettingsPage !== undefined &&
                     isSettingsPage === true ? (
                        <Button variant='text' onClick={() => history.back()}>
                           Go Back
                        </Button>
                     ) : (
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

                  <Box sx={{ flexGrow: 0 }}>
                     <Tooltip title='Open settings'>
                        <IconButton
                           onClick={handleOpenUserMenu}
                           sx={{ p: 0 }}
                           data-testid='avatar'
                        >
                           <Avatar
                              alt='Remy Sharp'
                              // src='/static/images/avatar/2.jpg'
                           />
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
               <Link
                  href='/login'
                  underline='hover'
                  data-testid='home-page'
                  className='navbar-login'
                  variant='overline'
                  sx={{ fontWeight: 'bold', marginLeft: 'auto' }}
               >
                  <Typography variant='overline'>Log in</Typography>
               </Link>
            )}
            <IconButton
               sx={{ ml: 1 }}
               onClick={colorMode.toggleColorMode}
               color='inherit'
            >
               {theme.palette.mode === 'dark' ? (
                  <Brightness7Icon />
               ) : (
                  <Brightness4Icon />
               )}
            </IconButton>
         </Toolbar>
         {/* </Container> */}
      </AppBar>
   );
};

export default NavBar;
