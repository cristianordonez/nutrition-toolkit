import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { AlertColor, IconButton, Toolbar, Tooltip } from '@mui/material';
import axios from 'axios';
import format from 'date-fns/format';
import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import {
   CurrentGoals,
   FoodSearchResult,
   NutritionSummaryMealplan,
   Query,
} from '../../../../types/types';
import { CustomAlert } from '../../components/custom-alert/CustomAlert';
import { SideBar } from '../../components/sidebar/SideBar';
import MealPlanPage from './meal-plan-page/MealPlanPage';
import { SearchForm } from './search-page/search-form';

const Home = () => {
   const [goals, setGoals] = useState({} as CurrentGoals);
   const [mobileOpen, setMobileOpen] = useState(false);
   const [searchResults, setSearchResults] = useState<FoodSearchResult[]>([]);
   const [currentTab, setCurrentTab] = useState<string>('advanced-search');
   const [openAlert, setOpenAlert] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);
   const [alertMessage, setAlertMessage] = useState<string>('');
   //TODO add type for mealplan items
   const [mealplanItems, setMealplanItems] = useState<any>([]);
   const [showLoadMoreBtn, setShowLoadMoreBtn] = useState<boolean>(false);
   const [nutritionSummary, setNutritionSummary] =
      useState<NutritionSummaryMealplan>({
         total_calories: '0',
         total_protein: '0',
         total_fat: '0',
         total_carbohydrates: '0',
      });
   const [sendAdvancedRequest, setSendAdvancedRequest] = useState(false);
   const [currentDay, setCurrentDay] = useState(
      format(new Date(Date.now()), 'yyyy-MM-dd')
   );
   const [alertSeverity, setAlertSeverity] = useState<AlertColor>('error');
   const [values, setValues] = useState<Query>({
      query: '',
      category: '',
      allergy: '',
      minCalories: '',
      maxCalories: '',
      minCarbs: '',
      maxCarbs: '',
      minProtein: '',
      maxProtein: '',
      minFat: '',
      maxFat: '',
      number: 10,
      offset: 0, //number of results to skip, useful for lazy loading
   });

   const handleLoadMore = async (event: React.SyntheticEvent) => {
      try {
         setLoading(true);
         let newValues = { ...values, offset: values.offset + 10 }; //update new offset so that we only receive the correct items from API
         setValues(newValues);
         const searchResultItems = sendAdvancedRequest
            ? await axios.get(`/api/food`, {
                 params: newValues,
                 withCredentials: true,
              })
            : await axios.get('/api/food/all', {
                 params: newValues,
                 withCredentials: true,
              });
         if (searchResultItems.data.length < 10) {
            setShowLoadMoreBtn(false);
         } else {
            setShowLoadMoreBtn(true);
         }
         setSearchResults(searchResults.concat(searchResultItems.data));
         setLoading(false);
      } catch (err) {
         setLoading(false);
         console.log(err);
      }
   };

   const handleAlert = (event: React.SyntheticEvent | Event) => {
      setOpenAlert(false);
   };

   const handleChange = (event: React.SyntheticEvent, currentValue: string) => {
      setCurrentTab(currentValue);
   };

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   const handleSubmit = async (event: React.SyntheticEvent) => {
      try {
         event.preventDefault();
         setSendAdvancedRequest(true);
         const newValues = { ...values, offset: 0 }; //declare new values so that there are no async bugs, and reset offset to 0 in case user changed it
         setValues(newValues);
         setLoading(true);
         const searchResultItems = await axios.get(`/api/food`, {
            params: newValues,
            withCredentials: true,
         });
         if (searchResultItems.data.length === 0) {
            setAlertMessage(
               'No options matched your search. Try again with a broader search'
            );
            setAlertSeverity('warning');
            setOpenAlert(true);
            setShowLoadMoreBtn(false);
         } else {
            setAlertSeverity('success');
            setAlertMessage('Success! Here are your matching items.');
            setOpenAlert(true);
            if (searchResultItems.data.length < 10) {
               setShowLoadMoreBtn(false);
            } else {
               setShowLoadMoreBtn(true);
            }
         }
         setSearchResults(searchResultItems.data);
         setLoading(false);
      } catch (err) {
         setLoading(false);
         setAlertSeverity('error');
         setAlertMessage(
            'Unable to get search results. Please try again later.'
         );
         setOpenAlert(true);
         console.log(err);
      }
   };

   //# SearchForm component is rendered in the sidebar as well as on main content of page
   const SearchFormComponent: JSX.Element = (
      <SearchForm
         handleSubmit={handleSubmit}
         handleChange={handleChange}
         currentTab={currentTab}
         setCurrentTab={setCurrentTab}
         values={values}
         setValues={setValues}
         goals={goals}
         setAlertMessage={setAlertMessage}
         setAlertSeverity={setAlertSeverity}
         setLoading={setLoading}
         setOpenAlert={setOpenAlert}
         setShowLoadMoreBtn={setShowLoadMoreBtn}
         setSearchResults={setSearchResults}
         setSendAdvancedRequest={setSendAdvancedRequest}
      />
   );

   useEffect(() => {
      let promise = axios.get('/api/goals', { withCredentials: true });
      promise.then((results) => {
         setGoals(results.data);
      });
      promise.catch((err) => {
         console.log(err);
      });
   }, []);

   return (
      <>
         <SideBar
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            SearchFormComponent={SearchFormComponent}
            goals={goals}
            searchResults={searchResults}
            nutritionSummary={nutritionSummary}
         />
         <Tooltip title='Open Sidebar'>
            <Toolbar sx={{ display: { sm: 'none' } }}>
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
         </Tooltip>

         <Routes>
            <Route
               path=''
               element={
                  <>
                     <MealPlanPage
                        handleDrawerToggle={handleDrawerToggle}
                        setAlertMessage={setAlertMessage}
                        setOpenAlert={setOpenAlert}
                        setAlertSeverity={setAlertSeverity}
                        setNutritionSummary={setNutritionSummary}
                        setMealplanItems={setMealplanItems}
                        currentDay={currentDay}
                        setCurrentDay={setCurrentDay}
                        mealplanItems={mealplanItems}
                        SearchFormComponent={SearchFormComponent}
                     />
                  </>
               }
            />
         </Routes>
         <Outlet
            context={{
               loading,
               setGoals,
               handleDrawerToggle,
               handleLoadMore,
               setAlertMessage,
               setOpenAlert,
               setAlertSeverity,
               showLoadMoreBtn,
               SearchFormComponent,
               setNutritionSummary,
               setMealplanItems,
               currentDay,
               setCurrentDay,
               searchResults,
               mealplanItems,
               goals,
               mobileOpen,
            }}
         />
         <CustomAlert
            openAlert={openAlert}
            handleAlert={handleAlert}
            alertSeverity={alertSeverity}
            alertMessage={alertMessage}
         />
      </>
   );
};

export default Home;
