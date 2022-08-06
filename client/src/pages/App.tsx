import React from 'react';
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
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { PaletteMode } from '@mui/material';
import { teal, grey } from '@mui/material/colors';
import { useLocalStorageState } from '../hooks/useLocalStorage';

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
