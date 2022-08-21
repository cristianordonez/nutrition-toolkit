import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navbar/NavBar';

import { useLocation } from 'react-router-dom';
import { CustomAlert } from '../../components/shared/CustomAlert';
import { AlertColor } from '@mui/material';
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
               <div>this is a test</div>
            </>
         ) : null}
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
