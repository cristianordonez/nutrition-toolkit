import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navbar/NavBar';
import { SampleRecipeList } from './sample-recipe-list';
import { SampleRecipeSideBar } from './sample-recipe-list/sample-recipe-sidebar/SampleRecipeSideBar';
import { useLocation } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CustomAlert } from '../../components/CustomAlert';
import {
   AlertColor,
   CircularProgress,
   SelectChangeEvent,
   Stack,
   Toolbar,
   IconButton,
} from '@mui/material';
import axios from 'axios';
//todo render either random recipes view, macro calculator, search
//  window, or a uneditable custom mealplan view based on props
// passed to component from user router and lcoation

type LocationType = {
   pathname: string;
   key: string;
   search: string;
   state: { featureView: 'recipes' | 'calculator' | 'mealplan' };
};

export type RouteValues = {
   query: string;
   type: string;
   minCalories: string;
   maxCalories: string;
   minProtein: string;
   maxProtein: string;
   minCarbs: string;
   maxCarbs: string;
   minFat: string;
   maxFat: string;
   offset: number;
   number: number;
};

//todo provide a go back button somewhere on page that user can user to go back to home page
const SampleAppFeaturesPage = () => {
   const location = useLocation() as unknown as LocationType;
   const [showPopularRecipes, setShowPopularRecipes] = useState<boolean>(true);
   const [openAlert, setOpenAlert] = useState<boolean>(false);
   const [alertSeverity, setAlertSeverity] = useState<AlertColor>('error');
   const [alertMessage, setAlertMessage] = useState<string>('');
   const [popularRecipes, setPopularRecipes] = useState([]);
   const [showLoadMoreBtn, setShowLoadMoreBtn] = useState<boolean>(false);
   const [mobileOpen, setMobileOpen] = React.useState(false);
   const [route, setRoute] = useState<string>('recipes');
   const [isLoading, setIsLoading] = useState<boolean>(false);
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
   const [values, setValues] = useState<RouteValues>(initialState);
   const [searchedRecipes, setSearchedRecipes] = useState([]);

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   const handleAlert = () => {
      setOpenAlert(!openAlert);
   };

   useEffect(() => {
      if (location.state.featureView === 'recipes') {
         axios
            .get('/api/recipes/popular')
            .then((results) => {
               setPopularRecipes(results.data.recipes);
            })
            .catch((err) => {
               console.log('err: ', err);
               setAlertSeverity('error');
               setAlertMessage(
                  'An error has occurred. Please try again later.'
               );
               setOpenAlert(true);
            });
      }
   }, []);

   const handleRouteChange = (event: SelectChangeEvent) => {
      setRoute(event.target.value);
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [event.target.id]: event.target.value });
   };

   const handleTypeSelect = (event: SelectChangeEvent) => {
      setValues({ ...values, type: event.target.value });
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

   return (
      <>
         <NavBar />
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
         <SampleRecipeSideBar
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            route={route}
            values={values}
            handleRouteChange={handleRouteChange}
            handleInputChange={handleInputChange}
            handleTypeSelect={handleTypeSelect}
            handleSubmit={handleSubmit}
         />
         {isLoading ? (
            <Stack alignItems='center'>
               <CircularProgress size={100} />
            </Stack>
         ) : null}
         {popularRecipes.length && location.state.featureView === 'recipes' ? (
            <SampleRecipeList
               showPopularRecipes={showPopularRecipes}
               popularRecipes={popularRecipes}
               route={route}
            />
         ) : (
            <Stack alignItems='center'>
               <CircularProgress size={100} />
            </Stack>
         )}

         <CustomAlert
            openAlert={openAlert}
            alertSeverity={alertSeverity}
            alertMessage={alertMessage}
            handleAlert={handleAlert}
         />
      </>
   );
};

export default SampleAppFeaturesPage;
