import React, { useState } from 'react';

interface Metrics {
   gender: string;
   age: number;
   height: number;
   weight: number;
   activityLevel: number;
}

export const useMetrics = (props: Metrics) => {
   const [values, setValues] = useState({
      total_carbohydrates: 0,
      min_carbs_per_meal: 0,
      max_carbs_per_meal: 0,
      total_protein: 0,
      min_protein_per_meal: 0,
      max_protein_per_meal: 0,
      total_fat: 0,
      min_fat_per_meal: 0,
      max_fat_per_meal: 0,
      total_calories: 0,
      min_calories_per_meal: 0,
      max_calories_per_meal: 0,
   });
};
