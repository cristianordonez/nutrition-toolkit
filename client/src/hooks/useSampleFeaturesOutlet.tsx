import { useOutletContext } from 'react-router-dom';

interface OutletContext {
   mobileOpen: any;
   handleDrawerToggle: any;
   setNutritionSummary: any;
   setAlertSeverity: any;
   openAlert: any;
   setOpenAlert: any;
   handleAlert: any;
   setValues: any;
   setAlertMessage: any;
   setSampleMealplanItems: any;
   setMealplanItems: any;
   isLoading: any;
   mealplanItems: any;
   setPopularRecipes: any;
   popularRecipes: any;
   alertSeverity: any;
   showPopularRecipes: any;
   alertMessage: any;
   sampleMealplanItems: any;
   goals: any;
   setGoals: any;
   setGender: any;
   gender: any;
   age: any;
   route: any;
   setAge: any;
   height: any;
   setHeight: any;
   weight: any;
   setWeight: any;
   activityLevel: any;
   setActivityLevel: any;
   handleSubmit: any;
}

export const useSampleFeaturesOutlet = () => {
   return useOutletContext<OutletContext>();
};
