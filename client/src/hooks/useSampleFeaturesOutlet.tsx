import { AlertColor } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { useOutletContext } from 'react-router-dom';
import { CurrentGoals, Query } from '../../../types/types';

interface OutletContext {
   mobileOpen: boolean;
   handleDrawerToggle: () => void;
   setNutritionSummary: Dispatch<SetStateAction<any>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   openAlert: boolean;
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setValues: Dispatch<SetStateAction<Query>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   isLoading: boolean;
   // mealplanItems: FoodItemType[];
   alertSeverity: AlertColor;
   showPopularRecipes: boolean;
   alertMessage: string;
   goals: CurrentGoals;
   setGoals: Dispatch<SetStateAction<CurrentGoals>>;
   setGender: Dispatch<SetStateAction<string>>;
   gender: string;
   age: number;
   setAge: Dispatch<SetStateAction<string | number | (string | number)[]>>;
   height: string | number | (string | number)[];
   route: string;
   setHeight: Dispatch<SetStateAction<string | number | (string | number)[]>>;
   weight: number;
   setWeight: Dispatch<SetStateAction<string | number | (string | number)[]>>;
   activityLevel: number;
   setActivityLevel: Dispatch<SetStateAction<number>>;
   handleSubmit: () => void;
}

export const useSampleFeaturesOutlet = () => {
   return useOutletContext<OutletContext>();
};
