import { AlertColor } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { useOutletContext } from 'react-router-dom';
import { CurrentGoals, FoodSearchResult, Query } from '../../../types/types';

interface OutletContext {
   isSearching: boolean;
   handleLoadMore: () => void;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   showLoadMoreBtn: boolean;
   setNutritionSummary: Dispatch<SetStateAction<[]>>;
   setFoodLogItemsFound: Dispatch<SetStateAction<boolean>>;
   setIsSearching: Dispatch<SetStateAction<boolean>>;
   searchResults: FoodSearchResult[];
   goals: CurrentGoals;
   setGoals: Dispatch<SetStateAction<CurrentGoals>>;
   handleSubmit: (event: React.SyntheticEvent) => Promise<void>;
   values: Query;
   setShowLoadMoreBtn: Dispatch<SetStateAction<boolean>>;
   setValues: Dispatch<SetStateAction<Query>>;
   setSearchResults: Dispatch<SetStateAction<FoodSearchResult[]>>;
   setSendAdvancedRequest: Dispatch<SetStateAction<boolean>>;
}

export const useHomeOutlet = () => {
   return useOutletContext<OutletContext>();
};
