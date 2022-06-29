import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Button, Snackbar, Alert } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Home = (props: any) => {
   const location: any = useLocation();

   return (
      <>
         <Button>
            <Link to='/login'>Log in</Link>
         </Button>
      </>
   );
};

export default Home;
