import React from 'react';
import './index.scss';
import ReactDOM from 'react-dom/client';
import { App } from './pages/App';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
   <ThemeProvider theme={theme}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </ThemeProvider>
);
