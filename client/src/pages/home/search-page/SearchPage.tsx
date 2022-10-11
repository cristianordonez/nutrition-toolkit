import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { FoodSearchList } from '../../../components/food-search-list';
import { useHomeOutlet } from '../../../hooks/useHomeOutlet';
import './SearchPage.scss';

const SearchPage = () => {
   const {
      isSearching,
      handleLoadMore,
      setAlertMessage,
      setOpenAlert,
      setAlertSeverity,
      showLoadMoreBtn,
      SearchFormComponent,
      searchResults,
      setIsSearching,
   } = useHomeOutlet();

   useEffect(() => {
      setIsSearching(false);
   }, []);
   return (
      <>
         <>
            <Box className='search-page' sx={{ width: '100%' }}>
               {searchResults.length ? (
                  <>
                     <FoodSearchList
                        searchResults={searchResults}
                        handleLoadMore={handleLoadMore}
                        setAlertMessage={setAlertMessage}
                        setOpenSnackbar={setOpenAlert}
                        setAlertSeverity={setAlertSeverity}
                        enableAddToMealplanFeature={true}
                        showLoadMoreBtn={showLoadMoreBtn}
                     />
                  </>
               ) : (
                  <>{SearchFormComponent}</>
               )}
               {isSearching ? <CircularProgress size={68} /> : null}
            </Box>
         </>
      </>
   );
};

export default SearchPage;
