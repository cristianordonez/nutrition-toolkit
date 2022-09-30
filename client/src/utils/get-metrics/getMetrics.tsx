import { MetricsType } from './getMetrics.types';

export type Goals = {
   total_carbohydrates: number;
   min_carbohydrates_per_meal: number;
   max_carbohydrates_per_meal: number;
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

//calculations are primarily for diabetes
export const getMetrics = ({
   age,
   weight,
   gender,
   height,
   activityLevel,
}: MetricsType) => {
   let weightInKg = weight / 2.2;
   let heightInCm = Math.floor(height * 2.54);
   let additionalCalories = gender === 'female' ? -161 : 5;
   let rmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + additionalCalories;
   let result = {} as Goals;
   result.total_calories = Math.floor(rmr * activityLevel);
   result.min_calories_per_meal = Math.floor(result.total_calories / 3 - 150);
   result.max_calories_per_meal = Math.floor(result.total_calories / 3 + 150);
   result.total_carbohydrates = Math.floor((rmr * 0.45) / 4); //divide by 4 to get grams from kcal
   result.min_carbohydrates_per_meal = Math.floor(
      result.total_carbohydrates / 3 - 5
   ); //carbs are searched for in range of +/- 5 grams, to focus on diabetes
   result.max_carbohydrates_per_meal = Math.floor(
      result.total_carbohydrates / 3 + 5
   );
   result.total_protein = Math.floor(weightInKg);
   result.min_protein_per_meal = Math.floor(result.total_protein / 3 - 10); //protein is searched for in range of +/- 10 grams
   result.max_protein_per_meal = Math.floor(result.total_protein / 3 + 10);

   let caloriesLeft =
      result.total_calories -
      (result.total_carbohydrates * 4 + result.total_protein * 4);
   result.total_fat = Math.floor(caloriesLeft / 9);
   result.min_fat_per_meal = Math.floor(result.total_fat / 3 - 10); //fat is searched for in range of +/- 10 grams
   result.max_fat_per_meal = Math.floor(result.total_fat / 3 + 10);
   return result;
};
