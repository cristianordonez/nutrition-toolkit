import React from 'react';
import './SearchPage.scss';
import { CustomAlert } from '../../../components/custom-alert/CustomAlert';
import { FoodSearchList } from './food-search-list';
import { Box, Toolbar, IconButton, CircularProgress } from '@mui/material';
import { useAuth } from '../../../context/authContext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSearchOutlet } from '../../../hooks/useSearchOutlet';

const SearchPage = () => {
   const { isLoading, isLoggedIn, username } = useAuth(); //used to check if data is still being retrieved from database
   const {
      loading,
      handleDrawerToggle,
      apiData,
      route,
      handleLoadMore,
      setAlertMessage,
      setOpenSnackbar,
      setAlertSeverity,
      showLoadMoreBtn,
      SearchFormComponent,
      openAlert,
      handleAlert,
      alertSeverity,
      alertMessage,
   } = useSearchOutlet();

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
                           setOpenSnackbar={setOpenSnackbar}
                           setAlertSeverity={setAlertSeverity}
                           showLoadMoreBtn={showLoadMoreBtn}
                        />
                     </>
                  ) : (
                     <>{SearchFormComponent}</>
                  )}
                  {/* ERROR SNACKBAR */}
                  <CustomAlert
                     openAlert={openAlert}
                     handleAlert={handleAlert}
                     alertSeverity={alertSeverity}
                     alertMessage={alertMessage}
                  />
               </Box>
            </>
         )}
      </>
   );
};

export default SearchPage;
