import React, { useState, useEffect } from 'react';
import { SampleRecipeList } from './sample-recipe-list/SampleRecipeList';
import { CircularProgress, Stack } from '@mui/material';
import axios from 'axios';
import { useSampleFeaturesOutlet } from '../../../hooks/useSampleFeaturesOutlet';

//todo provide a go back button somewhere on page that user can user to go back to home page
const SampleAppRecipePage = () => {
   const {
      setAlertSeverity,
      openAlert,
      setOpenAlert,
      setAlertMessage,
      isLoading,
      setPopularRecipes,
      popularRecipes,
      alertSeverity,
      showPopularRecipes,
      alertMessage,
      route,
   } = useSampleFeaturesOutlet();

   const [showLoadMoreBtn, setShowLoadMoreBtn] = useState<boolean>(false);
   const [searchedRecipes, setSearchedRecipes] = useState([]);

   useEffect(() => {
      axios
         .get('/api/recipes/popular')
         .then((results) => {
            setPopularRecipes(results.data.recipes);
         })
         .catch((err) => {
            console.log('err: ', err);
            setAlertSeverity('error');
            setAlertMessage('An error has occurred. Please try again later.');
            setOpenAlert(true);
         });
   }, []);

   return (
      <>
         {isLoading ? (
            <Stack alignItems='center'>
               <CircularProgress size={100} />
            </Stack>
         ) : null}
         {popularRecipes.length ? (
            <SampleRecipeList
               showPopularRecipes={showPopularRecipes}
               popularRecipes={popularRecipes}
               route={route}
            />
         ) : (
            <Stack alignItems='center'>
               <CircularProgress size={100} />
            </Stack>
         )}
      </>
   );
};

export default SampleAppRecipePage;
