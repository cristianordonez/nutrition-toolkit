import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { AlertColor, IconButton, Toolbar, Tooltip } from '@mui/material';
import axios from 'axios';
import format from 'date-fns/format';
import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import {
   CurrentGoals,
   MealplanItemType,
   ValuesType,
} from '../../../../types/types';
import { CustomAlert } from '../../components/custom-alert/CustomAlert';
import { SideBar } from '../../components/sidebar/SideBar';
import { useAuth } from '../../context/authContext';
import MealPlanPage from './meal-plan-page/MealPlanPage';
import { SidebarMealplan } from './meal-plan-page/sidebar-mealplan/SideBarMealPlan';
import { SearchForm } from './search-page/search-form';
import { SideBarSearchPage } from './search-page/sidebar-searchpage/SideBarSearchPage';

const Home = () => {
   const { isLoading, isLoggedIn, username } = useAuth(); //used to check if data is still being retrieved from database
   const [goals, setGoals] = useState({} as CurrentGoals);
   const [mealplanItemsFound, setMealplanItemsFound] = useState<boolean>(true); //use this to display different page if no items are found
   const [mobileOpen, setMobileOpen] = useState(false);
   const [apiData, setAPIData] = useState<MealplanItemType[]>([]);
   const [currentTab, setCurrentTab] = useState<string>('custom-search');
   const [route, setRoute] = useState<string>('food');
   const [openAlert, setOpenAlert] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);
   const [breakfastItems, setBreakfastItems] = useState<MealplanItemType[]>([]);
   const [lunchItems, setLunchItems] = useState<MealplanItemType[]>([]);
   const [dinnerItems, setDinnerItems] = useState<MealplanItemType[]>([]);
   const [alertMessage, setAlertMessage] = useState<string>('');
   const [mealplanItems, setMealplanItems] = useState<MealplanItemType[]>([]);
   const [showLoadMoreBtn, setShowLoadMoreBtn] = useState<boolean>(false);
   const [nutritionSummary, setNutritionSummary] = useState<any[]>([]);
   const [currentDay, setCurrentDay] = useState(
      format(new Date(Date.now()), 'yyyy-MM-dd')
   ); //spoonacular api needs date in format '2022-07-13'
   const [alertSeverity, setAlertSeverity] = useState<AlertColor>('error');
   //TODO remove intolerance from this type and state
   const [values, setValues] = useState<ValuesType>({
      query: '',
      category: '',
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

   //# handles showing more items from api
   const handleLoadMore = async (event: React.SyntheticEvent) => {
      try {
         setLoading(true);
         let newValues = { ...values, offset: values.offset + 6 }; //update new offset so that we only receive the correct items from API
         setValues(newValues);
         let newItems: any = await axios.get(`/api/${route}`, {
            params: newValues,
         });
         if (newItems.data.length < 6) {
            setShowLoadMoreBtn(false);
         } else {
            setShowLoadMoreBtn(true);
         }
         setAPIData(apiData.concat(newItems.data));
         setLoading(false);
      } catch (err) {
         setLoading(false);
         console.log(err);
      }
   };

   //# handles closing the snackbar when there is data present
   const handleAlert = (event: React.SyntheticEvent | Event) => {
      setOpenAlert(false);
   };

   //# handles changing between tab views to display the suggested goals page
   const handleChange = (event: React.SyntheticEvent, currentValue: string) => {
      setCurrentTab(currentValue);
   };

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   //TODO handles submission to search for food items
   const handleSubmit = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      let newValues = { ...values, offset: 0 }; //declare new values so that there are no async bugs, and reset offset to 0 in case user changed it
      setValues(newValues);
      try {
         setLoading(true);
         let foodItems = await axios.get(`/api/food`, {
            params: newValues,
            withCredentials: true,
         });
         if (foodItems.data.length === 0) {
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
            if (foodItems.data.length < 6) {
               setShowLoadMoreBtn(false);
            } else {
               setShowLoadMoreBtn(true);
            }
         }
         setAPIData(foodItems.data);
         setLoading(false); //used to trigger the loading circle
      } catch (err) {
         setLoading(false); //used to trigger the loading circle
      }
   };

   //# SearchForm component is rendered in the sidebar as well as on main content of page
   const SearchFormComponent: JSX.Element = (
      <SearchForm
         handleSubmit={handleSubmit}
         route={route}
         setRoute={setRoute}
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
         setAPIData={setAPIData}
      />
   );

   //# at first render grabs the users metrics from db, no need to send userId as
   useEffect(() => {
      let promise = axios.get('/api/metrics', { withCredentials: true });
      promise.then((results) => {
         setGoals(results.data);
      });
      promise.catch((err) => {
         console.log(err);
      });
   }, []);

   return (
      <>
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
                     <SidebarMealplan
                        mobileOpen={mobileOpen}
                        handleDrawerToggle={handleDrawerToggle}
                        nutritionSummary={nutritionSummary}
                        mealplanItemsFound={mealplanItemsFound}
                        goals={goals}
                     />
                     <MealPlanPage
                        handleDrawerToggle={handleDrawerToggle}
                        setAlertMessage={setAlertMessage}
                        setOpenAlert={setOpenAlert}
                        setAlertSeverity={setAlertSeverity}
                        setNutritionSummary={setNutritionSummary}
                        setMealplanItemsFound={setMealplanItemsFound}
                        setMealplanItems={setMealplanItems}
                        currentDay={currentDay}
                        setCurrentDay={setCurrentDay}
                        mealplanItems={mealplanItems}
                        setBreakfastItems={setBreakfastItems}
                        setLunchItems={setLunchItems}
                        setDinnerItems={setDinnerItems}
                        breakfastItems={breakfastItems}
                        lunchItems={lunchItems}
                        dinnerItems={dinnerItems}
                        SearchFormComponent={SearchFormComponent}
                     />
                  </>
               }
            />
            <Route
               path='search'
               element={
                  <SideBarSearchPage
                     goals={goals}
                     mobileOpen={mobileOpen}
                     handleDrawerToggle={handleDrawerToggle}
                     SearchFormComponent={SearchFormComponent}
                     apiData={apiData}
                     route={route}
                  />
               }
            />
            <Route
               path='*'
               element={
                  <SideBar
                     mobileOpen={mobileOpen}
                     handleDrawerToggle={handleDrawerToggle}
                     page='macrocalculator'
                     goals={goals}
                  />
               }
            />
         </Routes>
         <Outlet
            context={{
               loading,
               setGoals,
               handleDrawerToggle,
               apiData,
               route,
               handleLoadMore,
               setAlertMessage,
               setOpenAlert,
               setAlertSeverity,
               showLoadMoreBtn,
               SearchFormComponent,
               setNutritionSummary,
               setMealplanItemsFound,
               setMealplanItems,
               currentDay,
               setCurrentDay,
               mealplanItems,
               breakfastItems,
               setBreakfastItems,
               lunchItems,
               setLunchItems,
               dinnerItems,
               goals,
               setDinnerItems,
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
