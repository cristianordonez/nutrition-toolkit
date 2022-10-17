import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { FoodSearchList } from '../../../components/food-search-list';
import { useHomeOutlet } from '../../../hooks/useHomeOutlet';
import { SearchForm } from './search-form';
import './SearchPage.scss';

const SearchPage = () => {
   const {
      isSearching,
      handleLoadMore,
      setAlertMessage,
      setOpenAlert,
      setAlertSeverity,
      showLoadMoreBtn,
      searchResults,
      setIsSearching,
      handleSubmit,
      values,
      setValues,
      goals,
      setShowLoadMoreBtn,
      setSearchResults,
      setSendAdvancedRequest,
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
                        enableAddToFoodLogFeature={true}
                        showLoadMoreBtn={showLoadMoreBtn}
                     />
                  </>
               ) : (
                  <SearchForm
                     handleSubmit={handleSubmit}
                     values={values}
                     setValues={setValues}
                     goals={goals}
                     setAlertMessage={setAlertMessage}
                     setAlertSeverity={setAlertSeverity}
                     setIsSearching={setIsSearching}
                     setOpenAlert={setOpenAlert}
                     setShowLoadMoreBtn={setShowLoadMoreBtn}
                     setSearchResults={setSearchResults}
                     setSendAdvancedRequest={setSendAdvancedRequest}
                  />
               )}
               {isSearching ? <CircularProgress size={68} /> : null}
            </Box>
         </>
      </>
   );
};

export default SearchPage;
