import React from 'react';
import './404.scss';
import NoPageFoundSvg from '../../../img/404-not-found.svg';
import { Button, Typography } from '@mui/material';
import NavBar from '../../components/navbar/NavBar';
import { useNavigate } from 'react-router-dom';

const NoPageFound = () => {
   const navigate = useNavigate();
   const handleNavigateToHome = () => {
      navigate('/');
   };

   return (
      <>
         <NavBar />
         <div className='page-not-found-container'>
            <Typography variant='h4'>Hi! It seems you are lost...</Typography>
            <Button onClick={handleNavigateToHome} variant='contained'>
               Back to Homepage
            </Button>
            <img src={NoPageFoundSvg} />
         </div>
      </>
   );
};

export default NoPageFound;
