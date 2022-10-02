import { PaletteMode } from '@mui/material';
import { grey, teal } from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode) => ({
   palette: {
      mode,
      primary: {
         ...teal,
         ...(mode === 'dark' && {
            main: '#6bb9f0',
         }),
         ...(mode === 'light' && {
            main: '#336e7b',
         }),
      },
      secondary: {
         ...teal,
         ...(mode === 'dark' && {
            main: '#dda0dd',
         }),
         ...(mode === 'light' && {
            main: '#8859b6',
         }),
      },
      ...(mode === 'dark' && {
         background: {
            default: '#080C24',
            paper: '#151E34',
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
