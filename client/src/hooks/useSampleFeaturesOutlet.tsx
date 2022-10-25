import { AlertColor } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
   CurrentGoals,
   FoodSearchResult,
   NutritionSummaryFoodLog,
   Query,
} from '../../../types/types';

interface OutletContext {
   mobileOpen: boolean;
   handleDrawerToggle: () => void;
   setNutritionSummary: Dispatch<SetStateAction<NutritionSummaryFoodLog>>;
   setSearchResults: Dispatch<SetStateAction<FoodSearchResult[]>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   openAlert: boolean;
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setValues: Dispatch<SetStateAction<Query>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   isLoading: boolean;
   searchResults: FoodSearchResult[];
   alertSeverity: AlertColor;
   alertMessage: string;
   goal: 'weight_loss' | 'maintain' | 'gain_muscle';
   setGoal: Dispatch<SetStateAction<string>>;
   goals: CurrentGoals;
   setGoals: Dispatch<SetStateAction<CurrentGoals>>;
   setGender: Dispatch<SetStateAction<string>>;
   gender: string;
   age: number;
   showLoadMoreBtn: boolean;
   handleLoadMore: () => void;
   setAge: Dispatch<SetStateAction<string | number>>;
   height: string | number;
   setHeight: Dispatch<SetStateAction<string | number>>;
   weight: number;
   setWeight: Dispatch<SetStateAction<string | number>>;
   activityLevel: number;
   setActivityLevel: Dispatch<SetStateAction<number>>;
   handleSubmit: () => void;
}

export const useSampleFeaturesOutlet = () => {
   return useOutletContext<OutletContext>();
};
