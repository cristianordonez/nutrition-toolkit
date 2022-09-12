import React from 'react';
import './SearchPage.scss';
import { FoodSearchList } from './food-search-list';
import { Box, Toolbar, IconButton, CircularProgress } from '@mui/material';
import { useAuth } from '../../../context/authContext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHomeOutlet } from '../../../hooks/useHomeOutlet';

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
                  <Toolbar
                     sx={{ display: { sm: 'none' }, alignSelf: 'flex-start' }}
                  >
                     <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                     >
                        <ArrowForwardIosIcon />
                     </IconButton>
                  </Toolbar>
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
