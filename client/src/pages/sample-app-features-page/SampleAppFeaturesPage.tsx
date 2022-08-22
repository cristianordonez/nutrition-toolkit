import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navbar/NavBar';
import { SampleRecipeList } from './sample-recipe-list';
import { useLocation } from 'react-router-dom';
import { CustomAlert } from '../../components/CustomAlert';
import { AlertColor, CircularProgress, Stack } from '@mui/material';
import axios from 'axios';
//todo render either random recipes view, macro calculator, search
//  window, or a uneditable custom mealplan view based on props
// passed to component from user router and lcoation

type LocationType = {
   pathname: string;
   key: string;
   search: string;
   state: { featureView: string };
};

interface Recipe {
   aggregateLikes: number;
   id: number;
   image: string;
   servings: number;
   title: string;
   sourceUrl: string;
   spoonacularSourceUrl: string;
   summary: string;
   readyInMinutes: number;
   vegetarian: boolean;
   vegan: boolean;
   cheap: boolean;
   instructions: string;
   sustainable: boolean;
   dairyFree: boolean;
   veryHealthy: boolean;
   veryPopular: boolean;
}

//todo provide a go back button somewhere on page that user can user to go back to home page
const SampleAppFeaturesPage = () => {
   const location = useLocation() as unknown as LocationType;
   const [openAlert, setOpenAlert] = useState<boolean>(false);
   const [alertSeverity, setAlertSeverity] = useState<AlertColor>('error');
   const [alertMessage, setAlertMessage] = useState<string>('');
   const [popularRecipes, setPopularRecipes] = useState([]);
   const [showLoadMoreBtn, setShowLoadMoreBtn] = useState<boolean>(false);

   const handleAlert = () => {
      setOpenAlert(!openAlert);
   };

   //todo move components folders into page folder it belongs to
   //todo move all components that are used more than once to components folder or keep there, and remove shared folder
   useEffect(() => {
      if (location.state.featureView === 'recipes') {
         axios
            .get('/api/recipes/popular')
            .then((results) => {
               console.log('results: ', results);
               setPopularRecipes(results.data.recipes);
            })
            .catch((err) => {
               console.log('err: ', err);
            });
      }
   }, []);

   //todo complete handling loading more from api but only when searching
   const handleLoadMore = () => {};

   //todo make new component to render list of cards, without nutrients and only minimal info
   console.log('location: ', location.state);
   console.log('popularRecipes: ', popularRecipes);
   return (
      <>
         <NavBar />
         {popularRecipes.length && location.state.featureView === 'recipes' ? (
            <>
               <SampleRecipeList popularRecipes={popularRecipes} />
            </>
         ) : (
            <Stack alignItems='center'>
               <CircularProgress size={100} />
            </Stack>
         )}
         <CustomAlert
            openAlert={openAlert}
            alertSeverity={alertSeverity}
            alertMessage={alertMessage}
            handleAlert={handleAlert}
         />
      </>
   );
};

export default SampleAppFeaturesPage;
