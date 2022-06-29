import React from 'react';
import {
   Typography,
   CircularProgress,
   Dialog,
   DialogContent,
   Box,
   TextField,
   Button,
   DialogActions,
   DialogTitle,
} from '@mui/material';
interface Props {
   goals: {
      user_id: number;
      total_carbohydrates: number;
      min_carbs_per_meal: number;
      max_carbs_per_meal: number;
      total_protein: number;
      min_protein_per_meal: number;
      max_protein_per_meal: number;
      total_fat: number;
      min_fat_per_meal: number;
      max_fat_per_meal: number;
      total_calories: number;
      min_calories_per_meal: number;
      max_calories_per_meal: number;
   };
}

export const DailyGoals = ({ goals }: Props) => {
   return (
      <>
         <Typography variant='h6'>Daily Macronutrient Goals</Typography>
         <CircularProgress variant='indeterminate' size={25} />
      </>
   );
};
