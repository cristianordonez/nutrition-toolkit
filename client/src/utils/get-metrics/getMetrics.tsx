import { CurrentGoals, MetricsType } from '../../../../types/types';

export const getMetrics = ({
   age,
   weight,
   gender,
   height,
   activityLevel,
   goal,
}: MetricsType): CurrentGoals => {
   const weightInKg = weight / 2.2;
   const heightInCm = height * 2.54;
   const heightInMeters = heightInCm / 100;
   const heightInMeterSquared = heightInMeters * heightInMeters;
   const bmi = weightInKg / heightInMeterSquared;
   const additionalCalories = gender === 'female' ? -161 : 5;
   const mifflinEnergyNeeds =
      10 * weightInKg + 6.25 * heightInCm - 5 * age + additionalCalories;
   let total_calories,
      total_protein,
      total_carbohydrates,
      total_fat,
      ibw,
      adjustedIBW,
      ibwInKg,
      adjustedIBWInKg;

   //get ideal body weight calculation and adjustedIBW for everyone
   if (gender === 'female') {
      if (height < 60) {
         ibw = Math.floor(105 - 5 * (60 - height));
      } else {
         ibw = Math.floor(105 + 5 * (height - 60));
      }
   } else {
      if (height < 60) {
         ibw = Math.floor(106 - 6 * (60 - height));
      } else {
         ibw = Math.floor(106 + 6 * (height - 60));
      }
   }
   adjustedIBW = Math.floor((weight - ibw) * 0.25 + ibw);
   ibwInKg = Math.floor(ibw / 2.2);
   adjustedIBWInKg = Math.floor(adjustedIBW / 2.2);

   if (bmi >= 30) {
      if (goal === 'weight_loss') {
         total_calories = Math.floor(mifflinEnergyNeeds * activityLevel) - 250;
         total_protein = Math.floor(adjustedIBWInKg * 1.8);
      } else if (goal === 'gain_muscle') {
         total_calories = Math.floor(mifflinEnergyNeeds * activityLevel) + 250;
         total_protein = Math.floor(adjustedIBWInKg * 1.8);
      } else {
         total_calories = Math.floor(mifflinEnergyNeeds * activityLevel);
         total_protein = Math.floor(adjustedIBWInKg * 1.2);
      }
   } else if (bmi < 30 && bmi >= 25) {
      // if person overweight but not obese use ideal body weight for protein and energy needs
      if (goal === 'weight_loss') {
         total_calories = Math.floor(ibwInKg * 22);
         total_protein = Math.floor(ibwInKg * 1.8);
      } else if (goal === 'gain_muscle') {
         total_calories = Math.floor(ibwInKg * 32);
         total_protein = Math.floor(ibwInKg * 1.8);
      } else {
         total_calories = Math.floor(ibwInKg * 28);
         total_protein = Math.floor(ibwInKg * 1.2);
      }
   } else {
      // if person normal weight use normal weight in kg
      if (goal === 'weight_loss') {
         total_calories = Math.floor(weightInKg * 22);
         total_protein = Math.floor(weightInKg * 1.8);
      } else if (goal === 'gain_muscle') {
         total_calories = Math.floor(weightInKg * 32);
         total_protein = Math.floor(weightInKg * 1.8);
      } else {
         total_calories = Math.floor(weightInKg * 28);
         total_protein = Math.floor(weightInKg * 1.2);
      }
   }
   total_carbohydrates = Math.floor((total_calories * 0.5) / 4);
   total_fat = Math.floor(
      (total_calories - (total_protein * 4 + total_carbohydrates * 4)) / 9
   );
   return {
      total_calories,
      total_carbohydrates,
      total_fat,
      total_protein,
      goal,
   };
};
