import React from 'react';
import './Footer.scss';
import { Box, Stack, IconButton, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import getYear from 'date-fns/getYear';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const Footer = () => {
   const currentYear = getYear(new Date(Date.now()));

   return (
      <>
         <Box
            sx={{
               display: 'flex',
               width: '100%',
               bottom: '0',
               //    position: 'absolute',
               justifyContent: 'center',
               alignItems: 'center',
               flexDirection: 'column',
               marginTop: 'auto',
               paddingTop: '8rem',
               paddingBottom: '1rem',
               flexShrink: '0',
            }}
         >
            <Stack direction='row' spacing={2}>
               <IconButton
                  aria-label='link to github'
                  target='_blank'
                  href='https://github.com/cristianordonez'
               >
                  <GitHubIcon color='inherit' />
               </IconButton>
               <IconButton
                  aria-label='link to linkedin'
                  target='_blank'
                  href='https://www.linkedin.com/in/cristian-ordonez-rd/'
               >
                  <LinkedInIcon color='inherit' />
               </IconButton>
               <IconButton href='mailto:cristianordonezrd@gmail.com'>
                  <EmailIcon color='inherit' />
               </IconButton>
            </Stack>
            <Typography variant='body2'>
               {' '}
               Created by Cristian Ordonez © {currentYear}{' '}
            </Typography>
         </Box>
      </>
   );
};
