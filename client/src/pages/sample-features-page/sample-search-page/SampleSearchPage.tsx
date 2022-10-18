import { CircularProgress, Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { FoodSearchList } from '../../../components/food-search-list';
import { useSampleFeaturesOutlet } from '../../../hooks/useSampleFeaturesOutlet';
import './SampleSearchPage.scss';

const SampleSearchPage = () => {
   const {
      setAlertSeverity,
      setAlertMessage,
      setOpenAlert,
      searchResults,
      isLoading,
      handleLoadMore,
      showLoadMoreBtn,
      setSearchResults,
   } = useSampleFeaturesOutlet();

   useEffect(() => {
      const sampleItems = axios.get('/api/food/sample');
      sampleItems.then((response) => {
         setSearchResults(response.data);
      });
   }, []);
   return (
      <div className='search-page'>
         {searchResults.length > 0 ? (
            <FoodSearchList
               handleLoadMore={handleLoadMore}
               searchResults={searchResults}
               setOpenSnackbar={setOpenAlert}
               setAlertMessage={setAlertMessage}
               setAlertSeverity={setAlertSeverity}
               showLoadMoreBtn={showLoadMoreBtn}
               enableAddToFoodLogFeature={false}
            />
         ) : null}
         {isLoading ? (
            <Stack alignItems='center'>
               <CircularProgress size={100} />
            </Stack>
         ) : null}
      </div>
   );
};

export default SampleSearchPage;
