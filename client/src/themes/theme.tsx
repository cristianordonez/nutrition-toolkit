import { PaletteMode } from '@mui/material';
import { teal, grey } from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode) => ({
   palette: {
      mode,
      primary: {
         ...teal,
         ...(mode === 'dark' && {
            // main: '#BCCC9A',
            main: '#a6b2eb',
         }),
      },
      secondary: {
         ...teal,
         ...(mode === 'dark' && {
            main: '#3071e8',
         }),
      },
      neutral: {
         ...teal,
         ...(mode === 'dark' && {
            main: '#3071e8',
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
