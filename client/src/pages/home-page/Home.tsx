import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Snackbar, Alert } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Home = (props: any) => {
   const location: any = useLocation();

   return (
      <>
         <Button>
            <Link to='/login' data-testid='home-page'>Log in</Link>
         </Button>
      </>
   );
};

export default Home;
