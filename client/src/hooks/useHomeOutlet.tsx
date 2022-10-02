import { AlertColor } from '@mui/material';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { useOutletContext } from 'react-router-dom';
import { CurrentGoals, FoodSearchResult } from '../../../types/types';

interface OutletContext {
   loading: boolean;
   handleDrawerToggle: () => void;
   route: string;
   handleLoadMore: () => void;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   showLoadMoreBtn: boolean;
   SearchFormComponent: ReactNode;
   setNutritionSummary: Dispatch<SetStateAction<[]>>;
   setMealplanItemsFound: Dispatch<SetStateAction<boolean>>;
   // setMealplanItems: Dispatch<SetStateAction<MealplanItemType[] | []>>;
   currentDay: string;
   setCurrentDay: Dispatch<SetStateAction<string>>;
   // mealplanItems: MealplanItemType[];
   searchResults: FoodSearchResult[];
   goals: CurrentGoals;
   setGoals: Dispatch<SetStateAction<CurrentGoals>>;
   mobileOpen: boolean;
}

export const useHomeOutlet = () => {
   return useOutletContext<OutletContext>();
};
