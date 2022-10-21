import {
   AlertColor,
   Button,
   Grid,
   Slide,
   Stack,
   Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomAlert } from '../../components/custom-alert/CustomAlert';
import { Footer } from '../../components/footer/Footer';
import CalculateSvg from '../../img/calculate.svg';
import DietitianSvg from '../../img/dietitian.svg';
import MaleChefSvg from '../../img/male-chef.svg';
import ScheduleSvg from '../../img/schedule.svg';
import { LandingPageCard } from './landing-page-card/LandingPageCard';
import './LandingPage.scss';

type LocationType = {
   pathname: string;
   key: string;
   search: string;
   state: { loggedOut: boolean };
};

const LandingPage = () => {
   const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');
   const [openAlert, setOpenAlert] = useState(false);
   const [alertMessage, setAlertMessage] = useState(''); //message displayed on snackbar
   let navigate = useNavigate();
   const location = useLocation() as unknown as LocationType;

   //handles showing snackbar if request to server to login is not successful
   const handleAlert = () => {
      setOpenAlert(!openAlert);
   };

   const cardTitles = [
      'Calculate Your Macronutrient Needs',
      'Search For Matching Food Items',
      'Save Foods To Your Food Log',
   ];
   const cardMessages = [
      'Use our Macronutrient Calculator to find your  calorie and nutrient needs',
      'Search from over 350,000 foods, filtering by calories, carbs, protein or fat',
      `Get a better understanding of your eating habits with our food log`,
   ];
   const cardImages = [ScheduleSvg, MaleChefSvg, CalculateSvg];
   const featureView = ['calculator', 'search', 'foodLog'];

   const handleNavigatingToFeatures = (featureView: string) => {
      if (featureView === 'foodLog') {
         navigate(`/macro-trainer-features`);
      } else {
         navigate(`/macro-trainer-features/${featureView}`);
      }
   };

   useEffect(() => {
      if (location.state !== null && location.state.loggedOut) {
         setAlertSeverity('success');
         setAlertMessage('You have been logged out.');
         setOpenAlert(true);
         window.history.replaceState({}, document.title);
      }
   }, []);
   return (
      <>
         <div className='home-page'>
            <Stack
               direction={{ xs: 'column', sm: 'row' }}
               className='home-title-image'
               alignItems='center'
               gap={4}
            >
               <Stack direction='column' spacing={{ xs: 1, sm: 2, md: 4 }}>
                  <Typography
                     textAlign={{ xs: 'center', sm: 'left' }}
                     variant='h2'
                  >
                     The Macro Trainer
                  </Typography>
                  <Typography variant='body1' component='h5'>
                     Calculate your macronutrient needs and find food products
                     based on your desired nutrient content to reach your
                     fitness goals
                  </Typography>
                  <div className='home-btn'>
                     <Button
                        variant='contained'
                        onClick={() => navigate('/login')}
                        data-testid='home-page'
                        size='small'
                     >
                        Log in
                     </Button>
                     <Button
                        onClick={() =>
                           navigate('/macro-trainer-features/search')
                        }
                        variant='contained'
                        size='small'
                        color='secondary'
                     >
                        Browse Foods
                     </Button>
                  </div>
               </Stack>
               <img src={DietitianSvg} alt='Home page image' />
            </Stack>
            <Typography variant='h4'>How It Works</Typography>
            <Slide in={true} direction='right'>
               <Grid container spacing={2} alignItems='stretch'>
                  {cardMessages.map((message, index) => (
                     <LandingPageCard
                        key={message}
                        body={message}
                        title={cardTitles[index]}
                        image={cardImages[index]}
                        feature={featureView[index]}
                        handleNavigatingToFeatures={handleNavigatingToFeatures}
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
         <Footer />
      </>
   );
};

export default LandingPage;
