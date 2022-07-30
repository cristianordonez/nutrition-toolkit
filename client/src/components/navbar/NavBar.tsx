import React, { MouseEventHandler, useState, useContext } from 'react';
import './NavBar.scss';
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
const pages = ['Search', 'Macro Calculator', 'Meal Plan'];

// function MyApp() {
//    const theme = useTheme();
//    const colorMode = React.useContext(ColorModeContext);
//    return (
//       <Box
//          sx={{
//             display: 'flex',
//             width: '100%',
//             alignItems: 'center',
//             justifyContent: 'center',
//             bgcolor: 'background.default',
//             color: 'text.primary',
//             borderRadius: 1,
//             p: 3,
//          }}
//       >
//          {theme.palette.mode} mode
// <IconButton
//    sx={{ ml: 1 }}
//    onClick={colorMode.toggleColorMode}
//    color='inherit'
// >
//    {theme.palette.mode === 'dark' ? (
//       <Brightness7Icon />
//    ) : (
//       <Brightness4Icon />
//    )}
// </IconButton>
//       </Box>
//    );
interface Props {
   isLoggedIn: boolean;
}

const NavBar = ({ isLoggedIn }: Props) => {
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

   const handleLogout = async () => {
      try {
         let response = await axios.post('/api/logout');
         navigate('/');
      } catch (err) {
         console.log('err:', err);
      }
   };

   return (
      <AppBar
         position='fixed'
         sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            boxShadow: 'none',
         }}
         color='transparent'
         enableColorOnDark={true}
      >
         <Container maxWidth='xl'>
            <Toolbar disableGutters>
               {/* MOBILE DESKTOP*/}
               {/* <MenuBookIcon sx={{ display: { md: 'flex' }, mr: 1 }} /> */}
               <Box
                  component='img'
                  src={LOGO}
                  sx={{
                     display: { md: 'flex' },
                     mr: 1,
                     objectFit: 'contain',
                     height: '2.5rem',
                  }}
               ></Box>
               <Typography
                  variant='h6'
                  noWrap
                  component='a'
                  href='/'
                  sx={{
                     mr: 2,
                     display: { md: 'flex' },
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
                           {pages.map((page) => (
                              <MenuItem key={page} onClick={handleCloseNavMenu}>
                                 <Typography textAlign='center'>
                                    {page}
                                 </Typography>
                              </MenuItem>
                           ))}
                        </Menu>
                     </Box>

                     <AdbIcon
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                     />
                     <Typography
                        variant='h5'
                        noWrap
                        component='a'
                        data-testid='navlink'
                        href=''
                        sx={{
                           mr: 2,
                           display: { xs: 'flex', md: 'none' },
                           flexGrow: 1,
                           fontFamily: 'monospace',
                           fontWeight: 700,
                           letterSpacing: '.3rem',
                           color: 'inherit',
                           textDecoration: 'none',
                        }}
                     >
                        LOGO
                     </Typography>
                     <Box
                        sx={{
                           flexGrow: 1,
                           display: { xs: 'none', md: 'flex' },
                        }}
                     >
                        {pages.map((page) => (
                           <NavLink
                              key={page}
                              to={`/${page.toLowerCase().replace(/ /g, '')}`}
                           >
                              {page}
                           </NavLink>
                        ))}
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
                           <MenuItem onClick={handleMenuClick}>
                              <Typography
                                 textAlign='center'
                                 component='a'
                                 href='/settings'
                              >
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
                     sx={{ fontWeight: 'bold' }}
                  >
                     Log in
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
         </Container>
      </AppBar>
   );
};

export default NavBar;
