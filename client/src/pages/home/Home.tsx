import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
   Button,
   Snackbar,
   Alert,
   Grid,
   Typography,
   Stack,
   Box,
} from '@mui/material';
import { HomePageCard } from '../../components/home-page-card/HomePageCard';
import NavBar from '../../components/navbar/NavBar';
import './Home.scss';
import DietMealPlan from '../../../img/diet_meal_plan.svg';
import Chef_Isometric from '../../../img/Chef_Isometric.svg';
import Chef_Monochromatic from '../../../img/Chef_Monochromatic.svg';
import DietitianSvg from '../../../img/dietitian.svg';
import MaleChefSvg from '../../../img/male-chef.svg';
import FormSvg from '../../../img/form.svg';
import ScheduleSvg from '../../../img/schedule.svg';
import CalculateSvg from '../../../img/calculate.svg';
import { useNavigate } from 'react-router-dom';

export const Home = (props: any) => {
   const cardMessages = [
      'Use our Macronutrient Calculator to find your estimated daily carbohydrate needs',
      'Search for recipes, grocery products or menu items that match your nutrient needs',
      'Save your favorite items to your meal plan and view how many carbs you have left',
   ];
   const cardTitles = [
      'Calculate Macronutrient Needs',
      'Search For Matching Food Items',
      'Create Your Own Mealplan',
   ];
   const navigate = useNavigate();
   const cardImages = [CalculateSvg, MaleChefSvg, ScheduleSvg];

   return (
      <>
         <NavBar isLoggedIn={false} />
         <Stack
            direction={{ xs: 'column', sm: 'row' }}
            className='home-title-image'
            alignItems='center'
            gap={4}
            // justifyContent='center'
         >
            <Stack direction='column'>
               <Typography
                  textAlign={{ xs: 'center', sm: 'left' }}
                  variant='h2'
               >
                  Diabetes Meal Plan
               </Typography>
               <div className='home-btn'>
                  <Button
                     variant='contained'
                     onClick={() => navigate('/login')}
                     data-testid='home-page'
                  >
                     {/* <Link to='/login' data-testid='home-page'> */}
                     Log in
                     {/* </Link> */}
                  </Button>
               </div>
            </Stack>
            <img src={DietitianSvg} />
         </Stack>
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
      </>
   );
};
