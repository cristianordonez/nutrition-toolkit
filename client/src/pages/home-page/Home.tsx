import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Home = () => {
   return (
      <>
         <Button>
            <Link to='/login'>Log in</Link>
         </Button>
      </>
   );
};

export default Home;
