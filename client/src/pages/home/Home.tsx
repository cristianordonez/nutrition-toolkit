import React, { useState, useEffect } from 'react';
import {
   Button,
   Grid,
   Typography,
   Stack,
   Slide,
   AlertColor,
} from '@mui/material';
import { HomePageCard } from '../../components/home-page-card/HomePageCard';
import { CustomAlert } from '../../components/shared/CustomAlert';
import NavBar from '../../components/navbar/NavBar';
import './Home.scss';
import DietitianSvg from '../../../img/dietitian.svg';
import MaleChefSvg from '../../../img/male-chef.svg';
import ScheduleSvg from '../../../img/schedule.svg';
import CalculateSvg from '../../../img/calculate.svg';
import { useNavigate, useLocation } from 'react-router-dom';

type LocationType = {
   pathname: string;
   key: string;
   search: string;
   state: { loggedOut: boolean };
};

export const Home = () => {
   const [alertSeverity, setAlertSeverity] = useState<AlertColor | undefined>(
      'success'
   );
   const [openAlert, setOpenAlert] = useState(false);
   const [alertMessage, setAlertMessage] = useState(''); //message displayed on snackbar

   //handles showing snackbar if request to server to login is not successful
   const handleAlert = () => {
      setOpenAlert(!openAlert);
   };

   const cardMessages = [
      'Use our Macronutrient Calculator to find your estimated daily carbohydrate needs',
      'Search for recipes, grocery products or menu items that match your nutrient needs',
      'Save your favorite items to your meal plan and view how many carbs you have left',
   ];
   const cardTitles = [
      'Calculate Your Macronutrient Needs',
      'Search For Matching Food Items',
      'Create Your Own Custom Mealplan',
   ];
   const navigate = useNavigate();
   const cardImages = [CalculateSvg, MaleChefSvg, ScheduleSvg];
   const location = useLocation() as LocationType;

   //when logged out, react router sends state saying log out was successful to show alert
   useEffect(() => {
      if (location.state && location.state.loggedOut) {
         setAlertSeverity('success');
         setAlertMessage('You have been logged out.');
         setOpenAlert(true);
      }
   }, [location]);
   return (
      <>
         <NavBar isLoggedIn={false} />
         <div className='home-page'>
            <Stack
               direction={{ xs: 'column', sm: 'row' }}
               className='home-title-image'
               alignItems='center'
               gap={4}
            >
               <Stack direction='column'>
                  <Typography
                     textAlign={{ xs: 'center', sm: 'left' }}
                     variant='h2'
                  >
                     The Diabetes Calculator
                  </Typography>
                  <Typography variant='body1'>
                     We help you calculate your daily carbohydrate needs and
                     give you the power to create and customize your own custom
                     meal plan.
                  </Typography>
                  <div className='home-btn'>
                     <Button
                        variant='contained'
                        onClick={() => navigate('/login')}
                        data-testid='home-page'
                     >
                        Log in
                     </Button>
                  </div>
               </Stack>
               <img src={DietitianSvg} />
            </Stack>
            <Typography variant='h4'>How It Works</Typography>
            <Slide in={true} direction='right'>
               <Grid container spacing={2} alignItems='stretch'>
                  {cardMessages.map((message, index) => (
                     <HomePageCard
                        key={message}
                        body={message}
                        title={cardTitles[index]}
                        image={cardImages[index]}
                     />
                  ))}
               </Grid>
            </Slide>
         </div>
         <CustomAlert
            openAlert={openAlert}
            handleAlert={handleAlert}
            alertSeverity={alertSeverity}
            alertMessage={alertMessage}
         />
      </>
   );
};
