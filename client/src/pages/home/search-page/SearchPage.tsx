import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useHomeOutlet } from '../../../hooks/useHomeOutlet';
import { FoodSearchList } from './food-search-list';
import './SearchPage.scss';

const SearchPage = () => {
   const {
      loading,
      handleLoadMore,
      setAlertMessage,
      setOpenAlert,
      setAlertSeverity,
      showLoadMoreBtn,
      SearchFormComponent,
      searchResults,
      setLoading,
   } = useHomeOutlet();

   useEffect(() => {
      setLoading(false);
   }, []);
   return (
      <>
         <>
            <Box className='search-page' sx={{ width: '100vw' }}>
               {searchResults.length ? (
                  <>
                     <FoodSearchList
                        searchResults={searchResults}
                        handleLoadMore={handleLoadMore}
                        setAlertMessage={setAlertMessage}
                        setOpenSnackbar={setOpenAlert}
                        setAlertSeverity={setAlertSeverity}
                        showLoadMoreBtn={showLoadMoreBtn}
                     />
                  </>
               ) : (
                  <>{SearchFormComponent}</>
               )}
               {loading ? <CircularProgress size={68} /> : null}
            </Box>
         </>
      </>
   );
};

export default SearchPage;
