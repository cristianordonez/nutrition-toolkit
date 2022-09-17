import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import { useAuth } from '../../../context/authContext';
import { useHomeOutlet } from '../../../hooks/useHomeOutlet';
import { FoodSearchList } from './food-search-list';
import './SearchPage.scss';

const SearchPage = () => {
   const { isLoading, isLoggedIn, username } = useAuth(); //used to check if data is still being retrieved from database
   const {
      loading,
      handleDrawerToggle,
      apiData,
      route,
      handleLoadMore,
      setAlertMessage,
      setOpenAlert,
      setAlertSeverity,
      showLoadMoreBtn,
      SearchFormComponent,
   } = useHomeOutlet();

   return (
      <>
         {isLoading ? null : (
            <>
               <Box className='search-page' sx={{ width: '100vw' }}>
                  {/* PROGRESS BAR */}
                  {loading ? <CircularProgress size={68} /> : null}
                  {apiData.length ? (
                     <>
                        <FoodSearchList
                           apiData={apiData}
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
         )}
      </>
   );
};

export default SearchPage;
