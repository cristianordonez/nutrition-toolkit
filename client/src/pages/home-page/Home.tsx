import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '@mui/material/Button';

const Home = () => {
   //check if user is already logged in with sessions
   // const [loggedIn, setIsLoggedIn]: any = useAuth();

   return (
      <>
         <Button>
            <Link to='/login'>Log in</Link>
         </Button>
      </>
   );
};

export default Home;
