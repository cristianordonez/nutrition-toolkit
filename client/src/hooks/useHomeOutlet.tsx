import { AlertColor } from '@mui/material';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FoodSearchResult } from '../../../types/types';

interface OutletContext {
   isSearching: boolean;
   handleLoadMore: () => void;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   showLoadMoreBtn: boolean;
   SearchFormComponent: ReactNode;
   setNutritionSummary: Dispatch<SetStateAction<[]>>;
   setMealplanItemsFound: Dispatch<SetStateAction<boolean>>;
   setIsSearching: Dispatch<SetStateAction<boolean>>;
   searchResults: FoodSearchResult[];
}

export const useHomeOutlet = () => {
   return useOutletContext<OutletContext>();
};
