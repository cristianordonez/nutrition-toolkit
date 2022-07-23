import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
   Button,
   Snackbar,
   Alert,
   Grid,
   Typography,
   Stack,
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

export const Home = (props: any) => {
   const cardMessages = [
      'Use our macronutrient Calculator to find your estimated daily carbohydrate needs',
      'Search for recipes, grocery products or menu items from over 800 American restaurant chains that match your nutrient needs',
      'Create your own custom mealplan from your favorite items',
   ];
   const cardTitles = [
      'Calculate Macronutrient Needs',
      'Search For Matching Food Items',
      'Create Your Own Mealplan',
   ];

   const cardImages = [CalculateSvg, MaleChefSvg, ScheduleSvg];

   return (
      <>
         <NavBar isLoggedIn={false} />
         <Stack
            direction='row'
            className='home-title-image'
            alignItems='center'
            justifyContent='center'
         >
            <div>
               <Typography variant='h1'>Diabetes Meal Plan</Typography>
               <Button variant='contained'>
                  <Link to='/login' data-testid='home-page'>
                     Log in
                  </Link>
               </Button>
            </div>
            <img src={DietitianSvg} />
         </Stack>
         <Grid container spacing={2}>
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
