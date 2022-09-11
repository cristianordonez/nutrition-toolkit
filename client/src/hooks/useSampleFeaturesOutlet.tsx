import { useOutletContext } from 'react-router-dom';

interface OutletContext {
   mobileOpen: any;
   handleDrawerToggle: any;
   setNutritionSummary: any;
   setAlertSeverity: any;
   setOpenAlert: any;
   handleAlert: any;
   setValues: any;
   setAlertMessage: any;
   setSampleMealplanItems: any;
   setMealplanItems: any;
   isLoading: any;
   mealplanItems: any;
   setPopularRecipes: any;
   alertSeverity: any;
   openAlert: any;
   alertMessage: any;
   showPopularRecipes: any;
   popularRecipes: any;
   sampleMealplanItems: any;
}

export const useSampleFeaturesOutlet = () => {
   return useOutletContext<OutletContext>();
};
