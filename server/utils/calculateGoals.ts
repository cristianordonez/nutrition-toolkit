import { CalculateGoalsArgs } from '../../types/types';

export const calculate = ({
   age,
   weight,
   weightMetric,
   gender,
   height,
   heightMetric,
   activityLevel,
   goal,
}: CalculateGoalsArgs) => {
   let weightInKg, heightInCm;

   if (weightMetric === 'kg') {
      weightInKg = weight;
   } else {
      weightInKg = Number(weight) / 2.2;
   }

   if (heightMetric === 'ft') {
      heightInCm = Number(height) * 2.54;
   } else {
      heightInCm = height;
   }

   const heightInMeters = heightInCm / 100;
   const heightInMeterSquared = heightInMeters * heightInMeters;
   const bmi = weightInKg / heightInMeterSquared;
   const additionalCalories = gender === 'female' ? -161 : 5;
   const mifflinEnergyNeeds =
      10 * weightInKg +
      6.25 * heightInCm -
      5 * Number(age) +
      additionalCalories;
   let total_calories, total_protein, ibw;

   //get ideal body weight calculation and adjustedIBW for everyone
   if (gender === 'female') {
      if (height < 60) {
         ibw = Math.round(105 - 5 * (60 - Number(heightInCm / 2.54)));
      } else {
         ibw = Math.round(105 + 5 * (Number(heightInCm / 2.54) - 60));
      }
   } else {
      if (height < 60) {
         ibw = Math.round(106 - 6 * (60 - Number(heightInCm / 2.54)));
      } else {
         ibw = Math.round(106 + 6 * (Number(heightInCm / 2.54) - 60));
      }
   }
   console.log('ibw: ', ibw);

   const adjustedIBW = Math.round(
      (Number(weightInKg) * 2.2 - ibw) * 0.25 + ibw
   );
   const ibwInKg = Math.round(ibw / 2.2);
   const adjustedIBWInKg = Math.round(adjustedIBW / 2.2);

   if (bmi >= 30) {
      if (goal === 'weight_loss') {
         total_calories = Math.round(mifflinEnergyNeeds * activityLevel) - 100;
         total_protein = Math.round(adjustedIBWInKg * 1.8);
      } else if (goal === 'weight_gain') {
         total_calories = Math.round(mifflinEnergyNeeds * activityLevel) + 100;
         total_protein = Math.round(adjustedIBWInKg * 1.8);
      } else {
         total_calories = Math.round(mifflinEnergyNeeds * activityLevel);
         total_protein = Math.round(adjustedIBWInKg * 1.2);
      }
   } else if (bmi < 30 && bmi >= 25) {
      // if person overweight but not obese use ideal body weight for protein and energy needs
      if (goal === 'weight_loss') {
         total_calories = Math.round(ibwInKg * 22);
         total_protein = Math.round(ibwInKg * 1.8);
      } else if (goal === 'weight_gain') {
         total_calories = Math.round(ibwInKg * 32);
         total_protein = Math.round(ibwInKg * 1.8);
      } else {
         total_calories = Math.round(ibwInKg * 28);
         total_protein = Math.round(ibwInKg * 1.2);
      }
   } else {
      // if person normal weight use normal weight in kg
      if (goal === 'weight_loss') {
         total_calories = Math.round(weightInKg * 22);
         total_protein = Math.round(weightInKg * 1.8);
      } else if (goal === 'weight_gain') {
         total_calories = Math.round(weightInKg * 32);
         total_protein = Math.round(weightInKg * 1.8);
      } else {
         total_calories = Math.round(weightInKg * 28);
         total_protein = Math.round(weightInKg * 1.2);
      }
   }
   const total_carbohydrates = Math.round((total_calories * 0.45) / 4);
   const total_fat = Math.round(
      (total_calories - (total_protein * 4 + total_carbohydrates * 4)) / 9
   );
   return {
      total_calories,
      total_carbohydrates,
      total_fat,
      total_protein,
   };
};
