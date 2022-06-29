import React, { useState, useEffect } from 'react';
import './Search.scss';
import { SearchForm } from '../../components/search-form/SearchForm';
import FoodSearchList from '../../components/food-search-list/FoodSearchList';
import {
   Grid,
   Toolbar,
   IconButton,
   Stack,
   Alert,
   CircularProgress,
   Snackbar,
} from '@mui/material';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { useAuth } from '../../context/authContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//todo change 0
interface Goals {
   total_carbohydrates: 0;
   min_carbs_per_meal: 0;
   max_carbs_per_meal: 0;
   total_protein: 0;
   min_protein_per_meal: 0;
   max_protein_per_meal: 0;
   total_fat: 0;
   min_fat_per_meal: 0;
   max_fat_per_meal: 0;
   total_calories: 0;
   min_calories_per_meal: 0;
   max_calories_per_meal: 0;
}

export const Search = () => {
   const isLoading = useAuth(); //used to check if data is still being retrieved from database
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
   const [goals, setGoals] = useState({} as Goals);

   const [mobileOpen, setMobileOpen] = React.useState(false);

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   //# handles closing the snackbar when there is data present
   const handleClose = (event: React.SyntheticEvent | Event) => {
      setOpenSnackbar(false);
   };

   //# handles changing between tab views to display the suggested goals page
   const handleChange = (event: React.SyntheticEvent, currentValue: string) => {
      setCurrentTab(currentValue);
   };

   //# handles submission to search for food items
   const handleSubmit = async (event: React.SyntheticEvent) => {
      try {
         setLoading(true);
         event.preventDefault();
         let foodItems = await axios.get(`/api/${route}`, {
            params: values,
         });
         foodItems.data.length ? setOpenSnackbar(false) : setOpenSnackbar(true);
         setAPIData(foodItems.data);
         setLoading(false); //used to trigger the loading circle
      } catch (err) {
         setLoading(false); //used to trigger the loading circle
         console.log('err', err);
      }
   };

   //# handles submission when it comes from suggested goals form
   //# must be different because values are coming from goals state object
   const handleSuggestedSubmit = async (event: React.SyntheticEvent) => {
      try {
         setLoading(true); //used to trigger the loading circle
         event.preventDefault();
         let suggestedValues: any = values;
         suggestedValues.minCalories = goals.min_calories_per_meal;
         suggestedValues.maxCalories = goals.max_calories_per_meal;
         suggestedValues.minCarbs = goals.min_carbs_per_meal;
         suggestedValues.maxCarbs = goals.max_carbs_per_meal;
         suggestedValues.minProtein = goals.min_protein_per_meal;
         suggestedValues.maxProtein = goals.max_protein_per_meal;
         suggestedValues.minFat = goals.min_fat_per_meal;
         suggestedValues.maxFat = goals.max_fat_per_meal;
         console.log('suggestedValues:', suggestedValues);
         let foodItems = await axios.get(`/api/${route}`, {
            params: suggestedValues,
         });
         foodItems.data.length ? setOpenSnackbar(false) : setOpenSnackbar(true);
         setAPIData(foodItems.data);
         setLoading(false);
      } catch (err) {
         console.log('err:', err);
         setLoading(false); //used to trigger the loading circle
      }
   };

   //# handles showing more items from api
   const handleLoadMore = async (event: React.SyntheticEvent) => {
      try {
         setLoading(true); //update new offset so that we only receive the correct items from API
         let newValues = { ...values, offset: values.offset + 6 };
         setValues(newValues);
         let newItems: any = await axios.get(`/api/${route}`, {
            params: newValues,
         });
         setAPIData(apiData.concat(newItems.data));
         setLoading(false);
      } catch (err) {
         setLoading(false);
         console.log('err: ', err);
      }
   };

   //# at first render grabs the users metrics from db, no need to send userId as
   //# it will be stored in the express session
   useEffect(() => {
      let promise = axios.get('/api/metrics');
      promise.then((results) => {
         console.log('results:', results);
         setGoals(results.data);
      });
      promise.catch((err) => {
         console.log('er:', err);
      });
   }, []);

   //# searchForm component is rendered in the sidebar as well as on main content of page
   const searchForm: JSX.Element = (
      <SearchForm
         handleSubmit={handleSubmit}
         handleSuggestedSubmit={handleSuggestedSubmit}
         route={route}
         setRoute={setRoute}
         handleChange={handleChange}
         currentTab={currentTab}
         setCurrentTab={setCurrentTab}
         values={values}
         setValues={setValues}
         goals={goals}
      />
   );

   return (
      <>
         {isLoading ? (
            <div>Loading...</div>
         ) : (
            <Grid className='search-page' container spacing={1}>
               {/* PROGRESS BAR */}
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
                  goals={goals}
                  mobileOpen={mobileOpen}
                  handleDrawerToggle={handleDrawerToggle}
                  searchForm={searchForm}
                  apiData={apiData}
               />
               {/* MAIN SECTION  */}
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
               {/* ERROR SNACKBAR */}
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
         )}
      </>
   );
};
