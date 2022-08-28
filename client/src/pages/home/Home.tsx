import React, { useState, useEffect } from 'react';
import { Footer } from '../../components/footer/Footer';
import {
   Button,
   Grid,
   Typography,
   Stack,
   Slide,
   AlertColor,
} from '@mui/material';
import { HomePageCard } from './home-page-card/HomePageCard';
import { CustomAlert } from '../../components/custom-alert/CustomAlert';
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

const Home = () => {
   const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');
   const [openAlert, setOpenAlert] = useState(false);
   const [alertMessage, setAlertMessage] = useState(''); //message displayed on snackbar
   let navigate = useNavigate();

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
   const cardImages = [CalculateSvg, MaleChefSvg, ScheduleSvg];

   //pass down the feature view to cards so that they can be used to call the handleNavigatingToFeatures function
   const featureView = ['calculator', 'recipes', 'mealplan'];

   const location = useLocation() as LocationType;

   //when logged out, react router sends state saying log out was successful to show alert
   useEffect(() => {
      console.log('location.state:', location.state);
      if (location.state && location.state.loggedOut) {
         setAlertSeverity('success');
         setAlertMessage('You have been logged out.');
         setOpenAlert(true);
         location.state.loggedOut = false;
         window.history.replaceState({}, document.title);
      }
   }, [location]);

   //used to navigate to the SampleAppFeaturesPage with the correction variable passed down in location state
   const handleNavigatingToFeatures = (featureView: string) => {
      navigate(`/diabetes-calculator-features/${featureView}`);
   };

   return (
      <>
         <NavBar />
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
                     The Diabetes Calculator
                  </Typography>
                  <Typography variant='body1' component='h5'>
                     We help you calculate your daily carbohydrate needs and
                     give you the power to create and customize your own custom
                     meal plan.
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
                        onClick={() => handleNavigatingToFeatures('recipes')}
                        variant='contained'
                        size='small'
                        color='secondary'
                     >
                        Browse Recipes
                     </Button>
                  </div>
               </Stack>
               <img src={DietitianSvg} alt='Home page image' />
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

export default Home;
