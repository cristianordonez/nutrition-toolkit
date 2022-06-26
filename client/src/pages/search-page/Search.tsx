import React, { useState } from 'react';
import './Search.scss';
import SearchForm from '../../components/search-form/SearchForm';
import FoodSearchList from '../../components/food-search-list/FoodSearchList';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Sidebar from '../../components/sidebar/Sidebar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Search = () => {
   const [apiData, setAPIData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [route, setRoute] = useState<string>('recipes');
   const [currentTab, setCurrentTab] = useState<string>('custom-search');
   const [openSnackbar, setOpenSnackbar] = useState(false);
   const [values, setValues] = useState({
      query: '',
      type: '',
      diet: '',
      intolerance: '',
      minCalories: '',
      maxCalories: '',
      minCarbs: '',
      maxCarbs: '',
      minProtein: '',
      maxProtein: '',
      minFat: '',
      maxFat: '',
      number: 6, //number of items to return
      offset: 0, //number of results to skip, useful for lazy loading
   });
   const [mobileOpen, setMobileOpen] = React.useState(false);

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   //handles closing the snackbar when there is data present
   const handleClose = (event: React.SyntheticEvent | Event) => {
      setOpenSnackbar(false);
   };
   //handles changing between tab views to display the suggested goals page
   const handleChange = (event: React.SyntheticEvent, currentValue: string) => {
      setCurrentTab(currentValue);
   };

   const handleSubmit = async (event: React.SyntheticEvent) => {
      try {
         setLoading(true);
         event.preventDefault();
         let foodItems = await axios.get(`${__API__}/${route}`, {
            params: values,
         });
         foodItems.data.length ? setOpenSnackbar(false) : setOpenSnackbar(true);
         setAPIData(foodItems.data);
         setLoading(false);
      } catch (err) {
         setLoading(false);
         console.log('err', err);
      }
   };

   const handleLoadMore = async (event: React.SyntheticEvent) => {
      try {
         setLoading(true);
         //update new offset so that we only receive the correct items from API
         let newValues = { ...values, offset: values.offset + 6 };
         setValues(newValues);
         let newItems: any = await axios.get(`${__API__}/${route}`, {
            params: newValues,
         });
         setAPIData(apiData.concat(newItems.data));
         setLoading(false);
      } catch (err) {
         setLoading(false);
         console.log('err: ', err);
      }
   };

   const searchForm: JSX.Element = (
      <SearchForm
         handleSubmit={handleSubmit}
         route={route}
         setRoute={setRoute}
         handleChange={handleChange}
         currentTab={currentTab}
         setCurrentTab={setCurrentTab}
         values={values}
         setValues={setValues}
      />
   );

   return (
      <>
         <Grid className='search-page' container spacing={1}>
            {/* progress bar */}
            {loading && <CircularProgress size={68} />}
            <Toolbar>
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
            <Sidebar
               mobileOpen={mobileOpen}
               handleDrawerToggle={handleDrawerToggle}
               searchForm={searchForm}
               apiData={apiData}
            />
            {/* main section of page */}
            {apiData.length ? (
               <>
                  <Grid item xs={12} sm={8}>
                     <FoodSearchList
                        apiData={apiData}
                        route={route}
                        handleLoadMore={handleLoadMore}
                     />
                  </Grid>
               </>
            ) : (
               <>
                  <Grid item xs={12} sm={8}>
                     {searchForm}
                  </Grid>
               </>
            )}
            {/* snackbar alert that only displays on error */}
            <Stack direction='row' spacing={2}>
               <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={openSnackbar}
                  autoHideDuration={6000}
                  onClose={handleClose}
               >
                  <Alert onClose={handleClose} severity='error'>
                     No options matched your search. Try again with a broader
                     search.{' '}
                  </Alert>
               </Snackbar>
            </Stack>
         </Grid>
      </>
   );
};

export default Search;
