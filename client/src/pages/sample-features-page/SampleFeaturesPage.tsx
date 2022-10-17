import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
   AlertColor,
   IconButton,
   SelectChangeEvent,
   Toolbar,
   Tooltip,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import {
   CurrentGoals,
   FoodLogItem,
   FoodSearchResult,
   NutritionSummaryFoodLog,
   Query,
} from '../../../../types/types';
import { CustomAlert } from '../../components/custom-alert/CustomAlert';
import { getGoalsFromMetrics } from '../../utils/get-goals-from-metrics/getGoalsFromMetrics';
import SampleFoodLogPage from './sample-app-foodlog-page/SampleFoodLogPage';
import { SampleFeaturesSidebar } from './sample-features-sidebars';

const initialState = {
   query: '',
   category: 'All',
   allergy: '',
   minCalories: '',
   maxCalories: '',
   minProtein: '',
   maxProtein: '',
   minCarbs: '',
   maxCarbs: '',
   minFat: '',
   maxFat: '',
   offset: 0,
   number: 10,
};

const initialGoals = {
   total_carbohydrates: 0,
   total_protein: 0,
   total_fat: 0,
   total_calories: 0,
   goal: 'weight_loss' as 'weight_loss' | 'maintain' | 'gain_muscle',
};

const initialFoodLogGoals = {
   total_carbohydrates: 250,
   total_protein: 100,
   total_fat: 75,
   total_calories: 2075,
   goal: 'weight_loss' as 'weight_loss' | 'maintain' | 'gain_muscle',
};

const initialNutritionSummary = {
   total_calories: '0',
   total_fat: '0',
   total_carbohydrates: '0',
   total_protein: '0',
};

const SampleFeaturesPage = () => {
   const [mobileOpen, setMobileOpen] = React.useState(false);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [goals, setGoals] = useState<CurrentGoals>(initialGoals);
   const [alertSeverity, setAlertSeverity] = useState<AlertColor>('error');
   const [showLoadMoreBtn, setShowLoadMoreBtn] = useState<boolean>(false);
   const [alertMessage, setAlertMessage] = useState<string>('');
   const [values, setValues] = useState<Query>(initialState);
   const [openAlert, setOpenAlert] = useState<boolean>(false);
   const [sampleFoodLogItems, setSampleFoodLogItems] = useState<
      FoodLogItem[] | []
   >([]);
   const [searchResults, setSearchResults] = useState<FoodSearchResult[]>(
      [] as FoodSearchResult[]
   );
   const [age, setAge] = useState<number>(18);
   const [height, setHeight] = useState<number>(60);
   const [weight, setWeight] = useState<number>(200);
   const [activityLevel, setActivityLevel] = useState<number>(1);
   const [goal, setGoal] = React.useState<
      'weight_loss' | 'maintain' | 'gain_muscle'
   >('weight_loss');
   const [gender, setGender] = useState<'male' | 'female'>('male');
   const [nutritionSummary, setNutritionSummary] =
      useState<NutritionSummaryFoodLog>(initialNutritionSummary);

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   const handleSearch = async (event: React.SyntheticEvent) => {
      try {
         event.preventDefault();
         const newValues = { ...values, offset: 0 }; //declare new values so that there are no async bugs, and reset offset to 0 in case user changed it
         setValues(newValues);
         setIsLoading(true);
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
            setSearchResults(searchResultItems.data);
         }
         setIsLoading(false);
      } catch (err) {
         setIsLoading(false);
         setAlertSeverity('error');
         setAlertMessage(
            'Unable to get search results. Please try again later.'
         );
         setOpenAlert(true);
         console.log(err);
      }
   };

   const handleSubmit = (event: React.SyntheticEvent) => {
      event.preventDefault();
      const currentGoals = getGoalsFromMetrics({
         gender,
         age,
         height,
         weight,
         activityLevel,
         goal,
      });
      setGoals(currentGoals);
      setAlertSeverity('success');
      setAlertMessage(
         'Your custom macronutrient values have been calculated! View the sidebar to see your calculations'
      );
      setOpenAlert(true);
   };

   const handleLoadMore = async (event: React.SyntheticEvent) => {
      try {
         setIsLoading(true);
         let newValues = { ...values, offset: values.offset + 10 }; //update new offset so that we only receive the correct items from API
         setValues(newValues);
         const searchResultItems = await axios.get(`/api/food`, {
            params: newValues,
            withCredentials: true,
         });

         if (searchResultItems.data.length < 10) {
            setShowLoadMoreBtn(false);
         } else {
            setShowLoadMoreBtn(true);
         }
         setSearchResults(searchResults.concat(searchResultItems.data));
         setIsLoading(false);
      } catch (err) {
         setIsLoading(false);
         console.log(err);
      }
   };

   const handleAlert = () => {
      setOpenAlert(!openAlert);
   };

   const handleTypeSelect = (event: SelectChangeEvent) => {
      setValues({ ...values, category: event.target.value });
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [event.target.id]: event.target.value });
   };
   const handleRadioClick = (event: React.MouseEvent<HTMLInputElement>) => {
      if ((event.target as HTMLInputElement).value === values.allergy) {
         setValues({
            ...values,
            allergy: '',
         });
      } else {
         setValues({
            ...values,
            allergy: (event.target as HTMLInputElement).value,
         });
      }
   };
   return (
      <>
         <div className='main-page-container'>
            <Tooltip title='Open Sidebar'>
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
            </Tooltip>

            <Routes>
               <Route
                  path=''
                  element={
                     <>
                        <SampleFeaturesSidebar
                           mobileOpen={mobileOpen}
                           handleDrawerToggle={handleDrawerToggle}
                           values={values}
                           handleSearch={handleSearch}
                           handleInputChange={handleInputChange}
                           handleTypeSelect={handleTypeSelect}
                           goals={initialFoodLogGoals}
                           nutritionSummary={nutritionSummary}
                           view={'foodLog'}
                           handleRadioClick={handleRadioClick}
                        />
                        <SampleFoodLogPage
                           setNutritionSummary={setNutritionSummary}
                           setAlertSeverity={setAlertSeverity}
                           setOpenAlert={setOpenAlert}
                           setSampleFoodLogItems={setSampleFoodLogItems}
                           setAlertMessage={setAlertMessage}
                           sampleFoodLogItems={sampleFoodLogItems}
                        />
                     </>
                  }
               />
               <Route
                  path='search'
                  element={
                     <SampleFeaturesSidebar
                        mobileOpen={mobileOpen}
                        handleDrawerToggle={handleDrawerToggle}
                        values={values}
                        handleSearch={handleSearch}
                        handleInputChange={handleInputChange}
                        handleTypeSelect={handleTypeSelect}
                        goals={goals}
                        nutritionSummary={nutritionSummary}
                        view={'search'}
                        handleRadioClick={handleRadioClick}
                     />
                  }
               />
               <Route
                  path='calculator'
                  element={
                     <SampleFeaturesSidebar
                        mobileOpen={mobileOpen}
                        handleDrawerToggle={handleDrawerToggle}
                        values={values}
                        handleSearch={handleSearch}
                        handleInputChange={handleInputChange}
                        handleTypeSelect={handleTypeSelect}
                        goals={goals}
                        nutritionSummary={nutritionSummary}
                        view={'calculator'}
                        handleRadioClick={handleRadioClick}
                     />
                  }
               />
            </Routes>
            <Outlet
               context={{
                  mobileOpen,
                  handleDrawerToggle,
                  setNutritionSummary,
                  setAlertSeverity,
                  openAlert,
                  setOpenAlert,
                  setValues,
                  setAlertMessage,
                  isLoading,
                  alertSeverity,
                  alertMessage,
                  goals,
                  searchResults,
                  setGoals,
                  setGender,
                  setSearchResults,
                  gender,
                  age,
                  setAge,
                  height,
                  setHeight,
                  weight,
                  setWeight,
                  handleLoadMore,
                  showLoadMoreBtn,
                  activityLevel,
                  goal,
                  setGoal,
                  setActivityLevel,
                  handleSubmit,
               }}
            />
         </div>
         <CustomAlert
            openAlert={openAlert}
            handleAlert={handleAlert}
            alertSeverity={alertSeverity}
            alertMessage={alertMessage}
         />
      </>
   );
};

export default SampleFeaturesPage;
