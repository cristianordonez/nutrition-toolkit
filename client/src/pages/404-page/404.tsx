import React from 'react';
import NoPageFoundSvg from '../../../img/404-not-found.svg';
import { Typography } from '@mui/material';

export const NoPageFound = () => {
   return (
      <>
         <Typography variant='h1'>No Page Found</Typography>
         <img src={NoPageFoundSvg} />
      </>
   );
};
