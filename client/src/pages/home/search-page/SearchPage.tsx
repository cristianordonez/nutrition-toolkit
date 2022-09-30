import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import { useHomeOutlet } from '../../../hooks/useHomeOutlet';
import { FoodSearchList } from './food-search-list';
import './SearchPage.scss';

const SearchPage = () => {
   const {
      loading,
      route,
      handleLoadMore,
      setAlertMessage,
      setOpenAlert,
      setAlertSeverity,
      showLoadMoreBtn,
      SearchFormComponent,
      searchResults,
   } = useHomeOutlet();

   return (
      <>
         <>
            <Box className='search-page' sx={{ width: '100vw' }}>
               {loading ? <CircularProgress size={68} /> : null}
               {searchResults.length ? (
                  <>
                     <FoodSearchList
                        searchResults={searchResults}
                        route={route}
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
            </Box>
         </>
      </>
   );
};

export default SearchPage;
