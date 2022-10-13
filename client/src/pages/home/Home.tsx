import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { AlertColor, IconButton, Toolbar, Tooltip } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import {
   CurrentGoals,
   FoodSearchResult,
   MealplanItem,
   NutritionSummaryMealplan,
   Query,
} from '../../../../types/types';
import { CustomAlert } from '../../components/custom-alert/CustomAlert';
import { SideBar } from '../../components/sidebar/SideBar';
import { useAuth } from '../../context/authContext';
import MealPlanPage from './meal-plan-page/MealPlanPage';
import { SearchForm } from './search-page/search-form';

const initialGoals = {
   goal: 'weight_loss',
   total_calories: 0,
   total_carbohydrates: 0,
   total_protein: 0,
   total_fat: 0,
};

const Home = () => {
   const navigate = useNavigate();
   const { isLoggedIn, isLoading } = useAuth();
   const [goals, setGoals] = useState({} as CurrentGoals);

   // const [goals, setGoals] = useState({} as CurrentGoals);
   const [mobileOpen, setMobileOpen] = useState(false);
   const [searchResults, setSearchResults] = useState<FoodSearchResult[]>([]);
   const [currentTab, setCurrentTab] = useState<string>('advanced-search');
   const [openAlert, setOpenAlert] = useState<boolean>(false);
   const [isSearching, setIsSearching] = useState<boolean>(false);
   const [alertMessage, setAlertMessage] = useState<string>('');
   const [mealplanItems, setMealplanItems] = useState<MealplanItem[]>(
      [] as MealplanItem[]
   );
   const [showLoadMoreBtn, setShowLoadMoreBtn] = useState<boolean>(false);
   const [nutritionSummary, setNutritionSummary] =
      useState<NutritionSummaryMealplan>({} as NutritionSummaryMealplan);
   const [sendAdvancedRequest, setSendAdvancedRequest] = useState(false);
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
      offset: 0, //number of results to skip, useful for lazy isSearching
   });

   const handleLoadMore = async (event: React.SyntheticEvent) => {
      try {
         setIsSearching(true);
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
         setIsSearching(false);
      } catch (err) {
         setIsSearching(false);
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
         setIsSearching(true);
         const searchResultItems = sendAdvancedRequest
            ? await axios.get(`/api/food`, {
                 params: newValues,
                 withCredentials: true,
              })
            : await axios.get('/api/food/all', {
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
            setSearchResults(searchResultItems.data);
         }
         setIsSearching(false);
      } catch (err) {
         setIsSearching(false);
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
         values={values}
         setValues={setValues}
         goals={goals}
         setAlertMessage={setAlertMessage}
         setAlertSeverity={setAlertSeverity}
         setIsSearching={setIsSearching}
         setOpenAlert={setOpenAlert}
         setShowLoadMoreBtn={setShowLoadMoreBtn}
         setSearchResults={setSearchResults}
         setSendAdvancedRequest={setSendAdvancedRequest}
      />
   );

   //#navigate to home if user is not logged in, do not reroute in useAuth since we don't want user to reroute to landing page if they go straight to loggedin page or resetpassword page
   useEffect(() => {
      if (isLoggedIn === false && isLoading === false) {
         navigate('/', {
            state: { showError: false },
            replace: true,
         });
      } else {
         const initialGoals = {
            goal: 'weight_loss',
            total_calories: 0,
            total_carbohydrates: 0,
            total_protein: 0,
            total_fat: 0,
         };
         axios
            .get('/api/goals')
            .then((response) => {
               console.log('response: ', response);
               if (response.data === '') {
                  setGoals(initialGoals as CurrentGoals);
                  navigate('/home/macrocalculator');
               } else {
                  console.log('response in useauth: ', response);
                  setGoals(response.data);
               }
            })
            .catch((err) => {
               console.log(err);
            });
      }
   }, []);

   return (
      <>
         {!isSearching && !isLoading && Object.keys(goals).length > 0 ? (
            <SideBar
               mobileOpen={mobileOpen}
               handleDrawerToggle={handleDrawerToggle}
               SearchFormComponent={SearchFormComponent}
               isSearching={isSearching}
               goals={goals}
               searchResults={searchResults}
               nutritionSummary={nutritionSummary}
            />
         ) : null}
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
                        mealplanItems={mealplanItems}
                        SearchFormComponent={SearchFormComponent}
                        setIsSearching={setIsSearching}
                     />
                  </>
               }
            />
         </Routes>
         <Outlet
            context={{
               isSearching,
               handleLoadMore,
               setAlertMessage,
               setIsSearching,
               setOpenAlert,
               setAlertSeverity,
               showLoadMoreBtn,
               SearchFormComponent,
               setNutritionSummary,
               setMealplanItems,
               searchResults,
               mealplanItems,
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
