import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { SampleFeaturesSidebar } from './SampleFeaturesSidebar';
import { SearchFormCustom } from '../../components/search-forms/SearchFormCustom';
import { SampleMealplanSidebarContents } from './sample-app-mealplan-page/sample-mealplan-sidebar/SampleMealplanSidebarContents';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
   IconButton,
   Toolbar,
   AlertColor,
   SelectChangeEvent,
} from '@mui/material';
import { RouteValues } from '../../../../types/types';
import axios from 'axios';
import { SampleMealplanItem, FoodItemType } from '../../../../types/types';

const initialState = {
   query: '',
   type: '',
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

const sampleGoals = {
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

const SampleFeaturesPage = () => {
   const [mobileOpen, setMobileOpen] = React.useState(false);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [popularRecipes, setPopularRecipes] = useState([]);

   const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
   const [alertSeverity, setAlertSeverity] = useState<AlertColor>('error');
   const [alertMessage, setAlertMessage] = useState<string>('');
   const [route, setRoute] = useState<string>('recipes');
   const [openAlert, setOpenAlert] = useState<boolean>(false);
   const [values, setValues] = useState<RouteValues>(initialState);
   const [showPopularRecipes, setShowPopularRecipes] = useState<boolean>(true);
   const [mealplanItems, setMealplanItems] = useState<FoodItemType[] | []>([]);

   const [sampleMealplanItems, setSampleMealplanItems] = useState<
      SampleMealplanItem[] | []
   >([]);

   const [nutritionSummary, setNutritionSummary] = useState({
      calories: 0,
      fat: 0,
      carbohydrates: 0,
      protein: 0,
   });

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [event.target.id]: event.target.value });
   };

   const handleSubmit = async (event: React.SyntheticEvent) => {
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

   const handleRouteChange = (event: SelectChangeEvent) => {
      setRoute(event.target.value);
   };

   const handleAlert = () => {
      setOpenAlert(!openAlert);
   };

   const handleTypeSelect = (event: SelectChangeEvent) => {
      setValues({ ...values, type: event.target.value });
   };

   const SearchFormCustomComponent: JSX.Element = (
      <SearchFormCustom
         route={route}
         values={values}
         handleSubmit={handleSubmit}
         handleRouteChange={handleRouteChange}
         handleInputChange={handleInputChange}
         handleTypeSelect={handleTypeSelect}
      />
   );

   const SampleMealplanSidebarContentsComponent: JSX.Element = (
      <SampleMealplanSidebarContents
         goals={sampleGoals}
         nutritionSummary={nutritionSummary}
      />
   );

   return (
      <>
         <SampleFeaturesSidebar
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            SearchFormCustomComponent={SearchFormCustomComponent}
            SampleMealplanSidebarContentsComponent={
               SampleMealplanSidebarContentsComponent
            }
         />
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
         <Outlet
            context={{
               mobileOpen,
               handleDrawerToggle,
               setNutritionSummary,
               setAlertSeverity,
               setOpenAlert,
               handleAlert,
               setValues,
               setAlertMessage,
               setSampleMealplanItems,
               setMealplanItems,
               isLoading,
               mealplanItems,
               setPopularRecipes,
               popularRecipes,
               alertSeverity,
               openAlert,
               showPopularRecipes,
               alertMessage,
               sampleMealplanItems,
            }}
         />
      </>
   );
};

export default SampleFeaturesPage;
