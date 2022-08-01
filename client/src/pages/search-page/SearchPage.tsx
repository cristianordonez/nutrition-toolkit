import React, { useState, useEffect } from 'react';
import './SearchPage.scss';
import { SearchForm } from '../../components/search-form';
import { CustomAlert } from '../../components/shared/CustomAlert';
import { FoodSearchList } from '../../components/food-search-list';
import {
   Grid,
   Box,
   Toolbar,
   IconButton,
   Alert,
   CircularProgress,
   Snackbar,
   AlertColor,
} from '@mui/material';
import { SideBarSearchPage } from '../../components/sidebar-searchpage/SideBarSearchPage';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import NavBar from '../../components/navbar/NavBar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export type Goals = {
   user_id: number;
   total_carbohydrates: number;
   min_carbs_per_meal: number;
   max_carbs_per_meal: number;
   total_protein: number;
   min_protein_per_meal: number;
   max_protein_per_meal: number;
   total_fat: number;
   min_fat_per_meal: number;
   max_fat_per_meal: number;
   total_calories: number;
   min_calories_per_meal: number;
   max_calories_per_meal: number;
};

export const SearchPage = () => {
   const isLoading = useAuth(); //used to check if data is still being retrieved from database
   const [apiData, setAPIData] = useState([]);
   //todo add boolean for showing load more button
   const [showLoadMoreBtn, setShowLoadMoreBtn] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);
   const [route, setRoute] = useState<string>('recipes');
   const [currentTab, setCurrentTab] = useState<string>('custom-search');
   const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
   const [alertMessage, setAlertMessage] = useState<string>(
      'No options matched your search. Try again with a broader search.'
   );
   const [alertSeverity, setAlertSeverity] = useState<AlertColor | undefined>(
      'error'
   );
   const [values, setValues] = useState({
      query: '',
      type: '',
      intolerance: '',
      minCalories: '',
      maxCalories: '',
      minCarbs: '',
      maxCarbs: '',
      minProtein: '',
      maxProtein: '',
      minFat: '',
      maxFat: '',
      number: 6,
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

   //todo check if there are more items present, if not then toggle load more buton off
   //# handles submission to search for food items
   const handleSubmit = async (event: React.SyntheticEvent) => {
      let newValues = { ...values, offset: 0 }; //declare new values so that there are no async bugs, and reset offset to 0 in case user changed it
      setValues(newValues);
      try {
         setLoading(true);
         event.preventDefault();
         let foodItems = await axios.get(`/api/${route}`, {
            params: newValues,
            withCredentials: true,
         });
         if (foodItems.data.length === 0) {
            setAlertMessage(
               'No options matched your search. Try again with a broader search'
            );
            setAlertSeverity('warning');
            setOpenSnackbar(true);
            setShowLoadMoreBtn(false);
         } else {
            setAlertSeverity('success');
            setAlertMessage('Success! Here are your matching items.');
            setOpenSnackbar(true);
            if (foodItems.data.length < 6) {
               setShowLoadMoreBtn(false);
            } else {
               setShowLoadMoreBtn(true);
            }
         }
         // setAlertMessage(
         //    'No options matched your search. Try again with a broader search'
         // );
         // setAlertSeverity('warning');
         // foodItems.data.length ? setOpenSnackbar(false) : setOpenSnackbar(true);
         setAPIData(foodItems.data);
         setLoading(false); //used to trigger the loading circle
      } catch (err) {
         setLoading(false); //used to trigger the loading circle
         console.log('err', err);
      }
   };

   //todo check if there are more items present, if not then toggle load more buton off
   //# handles submission when it comes from suggested goals form, must be different because values are coming from goals state object
   const handleSuggestedSubmit = async (event: React.SyntheticEvent) => {
      console.log('values in searchpage.tsx: ', values);
      let newValues = { ...values, offset: 0 }; //declare new values so that there are no async bugs, and reset offset to 0 in case user changed it
      setValues(newValues);
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
         let foodItems = await axios.get(`/api/${route}`, {
            params: suggestedValues,
         });
         //if there are no items returned
         if (foodItems.data.length === 0) {
            setAlertMessage(
               'No options matched your search. Try again with a broader search'
            );
            setAlertSeverity('warning');
            setOpenSnackbar(true);
            setShowLoadMoreBtn(false);
         } else {
            setAlertSeverity('success');
            setAlertMessage('Success! Here are your matching items.');
            setOpenSnackbar(true);
            if (foodItems.data.length < 6) {
               setShowLoadMoreBtn(false);
            } else {
               setShowLoadMoreBtn(true);
            }
         }
         setValues(suggestedValues);
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
         setLoading(true);
         let newValues = { ...values, offset: values.offset + 6 }; //update new offset so that we only receive the correct items from API
         setValues(newValues);
         let newItems: any = await axios.get(`/api/${route}`, {
            params: newValues,
         });
         console.log('newItems.data in handle load more: ', newItems.data);
         console.log('newItems: ', newItems);
         if (newItems.data.length < 6) {
            setShowLoadMoreBtn(false);
         } else {
            setShowLoadMoreBtn(true);
         }
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
      let promise = axios.get('/api/metrics', { withCredentials: true });
      promise.then((results) => {
         setGoals(results.data);
      });
      promise.catch((err) => {
         console.log('er:', err);
      });
   }, []);

   //# SearchForm component is rendered in the sidebar as well as on main content of page
   const SearchFormComponent: JSX.Element = (
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
         {isLoading ? null : (
            <>
               <NavBar isLoggedIn={true} />
               <Box
                  className='search-page'
                  // container
                  // spacing={0}
                  sx={{ width: '100vw' }}
               >
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
                  <SideBarSearchPage
                     goals={goals}
                     mobileOpen={mobileOpen}
                     handleDrawerToggle={handleDrawerToggle}
                     SearchFormComponent={SearchFormComponent}
                     apiData={apiData}
                  />
                  {/* MAIN SECTION  */}
                  {apiData.length ? (
                     <>
                        {/* <Grid item xs={12} sm={8}> */}
                        <FoodSearchList
                           apiData={apiData}
                           route={route}
                           handleLoadMore={handleLoadMore}
                           setAlertMessage={setAlertMessage}
                           setOpenSnackbar={setOpenSnackbar}
                           setAlertSeverity={setAlertSeverity}
                           showLoadMoreBtn={showLoadMoreBtn}
                        />
                        {/* </Grid> */}
                     </>
                  ) : (
                     <>
                        {/* <Grid item xs={12} sm={8}> */}
                        {SearchFormComponent}
                        {/* </Grid> */}
                     </>
                  )}
                  {/* ERROR SNACKBAR */}
                  <CustomAlert
                     openAlert={openSnackbar}
                     handleAlert={handleClose}
                     alertSeverity={alertSeverity}
                     alertMessage={alertMessage}
                  />
               </Box>
            </>
         )}
      </>
   );
};
