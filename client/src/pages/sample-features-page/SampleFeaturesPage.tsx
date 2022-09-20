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
   FoodItemType,
   Query,
   SampleMealplanItem,
   ValuesType,
} from '../../../../types/types';
import { CustomAlert } from '../../components/custom-alert/CustomAlert';
import { getMetrics } from '../../utils/get-metrics/getMetrics';
import SampleMealPlanPage from './sample-app-mealplan-page/SampleMealPlanPage';
import { SampleFeaturesSidebar } from './sample-features-sidebars';
import './SampleFeaturesPage.scss';

const initialState = {
   query: '',
   type: '',
   intolerance: '',
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
   total_carbohydrates: 135,
   min_carbs_per_meal: 45,
   max_carbs_per_meal: 55,
   total_protein: 135,
   min_protein_per_meal: 30,
   max_protein_per_meal: 50,
   total_fat: 100,
   min_fat_per_meal: 25,
   max_fat_per_meal: 45,
   total_calories: 2000,
   min_calories_per_meal: 450,
   max_calories_per_meal: 650,
};

const initialNutritionSummary = {
   calories: 0,
   fat: 0,
   carbohydrates: 0,
   protein: 0,
};

const SampleFeaturesPage = () => {
   const [mobileOpen, setMobileOpen] = React.useState(false);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [popularRecipes, setPopularRecipes] = useState([]);
   const [goals, setGoals] = useState<CurrentGoals>(initialGoals);
   const [alertSeverity, setAlertSeverity] = useState<AlertColor>('error');
   const [alertMessage, setAlertMessage] = useState<string>('');
   const [route, setRoute] = useState<string>('recipes');
   const [openAlert, setOpenAlert] = useState<boolean>(false);
   const [values, setValues] = useState<ValuesType>(initialState);
   const [showPopularRecipes, setShowPopularRecipes] = useState<boolean>(true);
   const [mealplanItems, setMealplanItems] = useState<FoodItemType[] | []>([]);
   const [age, setAge] = useState<number>(18);
   const [height, setHeight] = useState<number>(60);
   const [weight, setWeight] = useState<number>(200);
   const [activityLevel, setActivityLevel] = useState<number>(1);

   const [gender, setGender] = useState('male');
   const [sampleMealplanItems, setSampleMealplanItems] = useState<
      SampleMealplanItem[] | []
   >([]);
   const [nutritionSummary, setNutritionSummary] = useState(
      initialNutritionSummary
   );

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   const handleSearch = async (event: React.SyntheticEvent) => {
      let newValues = { ...values, offset: 0 }; //declare new values so that there are no async bugs, and reset offset to 0 in case user changed it
      setValues(newValues);
      try {
         setIsLoading(true);
         event.preventDefault();
         let foodItems = await axios.get(`/api/${route}`, {
            params: newValues,
            withCredentials: true,
         });
         if (foodItems.data.length === 0) {
            setIsLoading(false);
            setAlertMessage(
               'No options matched your search. Try again with a broader search'
            );
            setAlertSeverity('warning');
            setOpenAlert(true);
         } else {
            setValues(initialState);
            setAlertSeverity('success');
            setAlertMessage('Success! Here are your matching items.');
            setOpenAlert(true);
            setShowPopularRecipes(false);
            setPopularRecipes(foodItems.data);
         }
         setIsLoading(false); //used to trigger the loading circle
      } catch (err) {
         setIsLoading(false); //used to trigger the loading circle
      }
   };

   const handleSubmit = (event: React.SyntheticEvent) => {
      event.preventDefault();
      const currentGoals = getMetrics({
         gender,
         age,
         height,
         weight,
         activityLevel,
      });
      setGoals(currentGoals);
      setAlertSeverity('success');
      setAlertMessage(
         'Your custom macronutrient values have been calculated! View the sidebar to see your calculations'
      );
      setOpenAlert(true);
   };

   const handleRouteChange = (event: SelectChangeEvent) => {
      setRoute(event.target.value);
   };

   const handleAlert = () => {
      setOpenAlert(!openAlert);
   };

   const handleTypeSelect = (event: SelectChangeEvent) => {
      setValues({ ...values, type: event.target.value });
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [event.target.id]: event.target.value });
   };

   return (
      <>
         <div className='main-page-container'>
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
                        <SampleFeaturesSidebar
                           mobileOpen={mobileOpen}
                           handleDrawerToggle={handleDrawerToggle}
                           route={route}
                           values={values}
                           handleSearch={handleSearch}
                           handleRouteChange={handleRouteChange}
                           handleInputChange={handleInputChange}
                           handleTypeSelect={handleTypeSelect}
                           goals={goals}
                           nutritionSummary={nutritionSummary}
                           view={'mealplan'}
                        />
                        <SampleMealPlanPage
                           setNutritionSummary={setNutritionSummary}
                           setAlertSeverity={setAlertSeverity}
                           setOpenAlert={setOpenAlert}
                           setSampleMealplanItems={setSampleMealplanItems}
                           setMealplanItems={setMealplanItems}
                           setAlertMessage={setAlertMessage}
                           mealplanItems={mealplanItems}
                           sampleMealplanItems={sampleMealplanItems}
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
                        route={route}
                        values={values}
                        handleSearch={handleSearch}
                        handleRouteChange={handleRouteChange}
                        handleInputChange={handleInputChange}
                        handleTypeSelect={handleTypeSelect}
                        goals={goals}
                        nutritionSummary={nutritionSummary}
                        view={'search'}
                     />
                  }
               />
               <Route
                  path='calculator'
                  element={
                     <SampleFeaturesSidebar
                        mobileOpen={mobileOpen}
                        handleDrawerToggle={handleDrawerToggle}
                        route={route}
                        values={values}
                        handleSearch={handleSearch}
                        handleRouteChange={handleRouteChange}
                        handleInputChange={handleInputChange}
                        handleTypeSelect={handleTypeSelect}
                        goals={goals}
                        nutritionSummary={nutritionSummary}
                        view={'calculator'}
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
                  route,
                  setOpenAlert,
                  setValues,
                  setAlertMessage,
                  setSampleMealplanItems,
                  setMealplanItems,
                  isLoading,
                  mealplanItems,
                  setPopularRecipes,
                  popularRecipes,
                  alertSeverity,
                  showPopularRecipes,
                  alertMessage,
                  sampleMealplanItems,
                  goals,
                  setGoals,
                  setGender,
                  gender,
                  age,
                  setAge,
                  height,
                  setHeight,
                  weight,
                  setWeight,
                  activityLevel,
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
