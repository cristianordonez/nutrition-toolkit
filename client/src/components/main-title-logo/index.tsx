import React from 'react';
import { LogoIcon } from './LogoIcon';
import { MainTitle } from './MainTitle';
import { Stack } from '@mui/material';

export const MainTitleLogo = () => {
   return (
      <Stack
         direction='row'
         spacing={1}
         justifyContent='center'
         alignItems='center'
      >
         <LogoIcon />
         <MainTitle />
      </Stack>
   );
};
