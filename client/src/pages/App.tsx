import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './home/Home';
import { LoginPage } from './login-page/LoginPage';
import { MacroCalculatorPage } from './macro-calculator-page/MacroCalculatorPage';
import { MealPlanPage } from './meal-plan-page/MealPlanPage';
import { SearchPage } from './search-page/SearchPage';
import { NoPageFound } from './404-page/404';
import { AuthProvider } from '../context/authContext';
import { UserSettingsPage } from './user-profile-page/UserProfilePage';
import { CssBaseline } from '@mui/material'; //used to provide mui color theme to all components
import {
   createTheme,
   responsiveFontSizes,
   useTheme,
} from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { PaletteMode, Box, IconButton } from '@mui/material';
import { teal, grey, blueGrey } from '@mui/material/colors';
import { useLocalStorageState } from '../hooks/useLocalStorage';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const getDesignTokens = (mode: PaletteMode) => ({
   palette: {
      mode,
      primary: {
         ...teal,
         ...(mode === 'dark' && {
            main: '#14ffec',
         }),
      },
      ...(mode === 'dark' && {
         background: {
            default: '#121212',
            paper: '#121212',
         },
      }),
      text: {
         ...(mode === 'light'
            ? {
                 primary: grey[900],
                 secondary: grey[800],
              }
            : {
                 primary: '#fff',
                 secondary: grey[500],
              }),
      },
   },
});

export const ColorModeContext = React.createContext({
   toggleColorMode: () => {},
});

// function MyApp() {
//    const theme = useTheme();
//    const colorMode = React.useContext(ColorModeContext);
//    return
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
//          <IconButton
//             sx={{ ml: 1 }}
//             onClick={colorMode.toggleColorMode}
//             color='inherit'
//          >
//             {theme.palette.mode === 'dark' ? (
//                <Brightness7Icon />
//             ) : (
//                <Brightness4Icon />
//             )}
//          </IconButton>
//       </Box>
//    );
// }

export const App = () => {
   const [mode, setMode] = useLocalStorageState('mode', 'dark');

   const colorMode = React.useMemo(
      () => ({
         // The dark mode switch would invoke this method
         toggleColorMode: () => {
            let currentMode = mode === 'light' ? 'dark' : 'light';
            localStorage.setItem('mode', mode === 'light' ? 'dark' : 'light');
            setMode((prevMode: PaletteMode) =>
               prevMode === 'light' ? 'dark' : 'light'
            );
         },
      }),
      []
   );

   // useEffect(() => {
   //    if (localStorage.getItem('mode')) {
   //       setMode(localStorage.getItem('mode'));
   //    }
   // }, []);

   let theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

   theme = responsiveFontSizes(theme);

   return (
      <>
         <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
               <CssBaseline />
               <Routes>
                  {/* PUBLIC PAGE */}
                  <Route path='/' element={<Home />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route
                     path='/search'
                     element={
                        <AuthProvider>
                           <SearchPage />
                        </AuthProvider>
                     }
                  />
                  <Route
                     path='/mealplan'
                     element={
                        <AuthProvider>
                           <MealPlanPage />
                        </AuthProvider>
                     }
                  />
                  <Route
                     path='/macrocalculator'
                     element={
                        <AuthProvider>
                           <MacroCalculatorPage />
                        </AuthProvider>
                     }
                  />
                  <Route
                     path='/settings'
                     element={
                        <AuthProvider>
                           <UserSettingsPage />
                        </AuthProvider>
                     }
                  />
                  <Route path='*' element={<NoPageFound />} />
               </Routes>
            </ThemeProvider>
         </ColorModeContext.Provider>
      </>
   );
};
