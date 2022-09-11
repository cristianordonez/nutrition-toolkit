import { useOutletContext } from 'react-router-dom';

interface OutletContext {
   handleDrawerToggle: any;
   setAlertMessage: any;
   setOpenAlert: any;
   setAlertSeverity: any;
   openAlert: any;
   handleAlert: any;
   alertSeverity: any;
   alertMessage: any;
   setNutritionSummary: any;
   setMealplanItemsFound: any;
   setMealplanItems: any;
   currentDay: any;
   setCurrentDay: any;
   mealplanItems: any;
   setBreakfastItems: any;
   setLunchItems: any;
   setDinnerItems: any;
}

export const useMealplanOutlet = () => {
   return useOutletContext<OutletContext>();
};
