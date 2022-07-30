import React from 'react';
import './index.scss';
import ReactDOM from 'react-dom/client';
import { App } from './pages/App';
import { BrowserRouter } from 'react-router-dom';
// import { createTheme, responsiveFontSizes } from '@mui/material/styles';
// import { ThemeProvider } from '@emotion/react';
// import { PaletteMode } from '@mui/material';
// import { amber, deepOrange, grey } from '@mui/material/colors';

// const getDesignTokens = (mode: PaletteMode) => ({
//    palette: {
//       mode,
//       primary: {
//          ...(mode === 'dark' && {
//             main: '#14ffec',
//          }),
//       },
//       ...(mode === 'dark' && {
//          background: {
//             // default: ,
//             // paper: ,
//          },
//       }),
//       text: {
//          ...(mode === 'light'
//             ? {
//                  primary: grey[900],
//                  secondary: grey[800],
//               }
//             : {
//                  primary: '#fff',
//                  secondary: grey[500],
//               }),
//       },
//    },
// });

// let theme = createTheme({
//    palette: {
//       mode: 'light',
//       primary: {
//          main: '#14ffec',
//       },
//    },
//    typography: {
//       h2: {
//          fontFamily: 'Open-sans',
//       },
//       allVariants: {
//          fontFamily: 'Roboto',
//       },
//    },
// });
// theme = responsiveFontSizes(theme);

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
   // <ThemeProvider theme={theme}>
   <BrowserRouter>
      <App />
   </BrowserRouter>
   // </ThemeProvider>
);
