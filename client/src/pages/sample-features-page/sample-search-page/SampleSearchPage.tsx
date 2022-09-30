import { CircularProgress, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useSampleFeaturesOutlet } from '../../../hooks/useSampleFeaturesOutlet';

//TODO provide a go back button somewhere on page that user can user to go back to home page
const SampleSearchPage = () => {
   const {
      setAlertSeverity,
      openAlert,
      setOpenAlert,
      setAlertMessage,
      isLoading,
      alertSeverity,
      showPopularRecipes,
      alertMessage,
      route,
   } = useSampleFeaturesOutlet();

   const [showLoadMoreBtn, setShowLoadMoreBtn] = useState<boolean>(false);
   const [searchedRecipes, setSearchedRecipes] = useState([]);

   return (
      <>
         {isLoading ? (
            <Stack alignItems='center'>
               <CircularProgress size={100} />
            </Stack>
         ) : null}
         {/* {popularRecipes.length ? (
            <SampleRecipeList
               showPopularRecipes={showPopularRecipes}
               popularRecipes={popularRecipes}
               route={route}
            />
         ) : (
            <Stack alignItems='center'>
               <CircularProgress size={100} />
            </Stack>
         )} */}
      </>
   );
};

export default SampleSearchPage;
