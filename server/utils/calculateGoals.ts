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
   const heightInCm = heightMetric === 'ft' ? Number(height) * 2.54 : height;
   const weightInKg = weightMetric === 'kg' ? weight : Number(weight) / 2.2;
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
      ibw =
         height < 60
            ? Math.round(105 - 5 * (60 - Number(heightInCm / 2.54)))
            : Math.round(105 + 5 * (Number(heightInCm / 2.54) - 60));
   } else {
      ibw =
         height < 60
            ? Math.round(106 - 6 * (60 - Number(heightInCm / 2.54)))
            : Math.round(106 + 6 * (Number(heightInCm / 2.54) - 60));
   }

   const adjustedIBW = Math.round(
      (Number(weightInKg) * 2.2 - ibw) * 0.25 + ibw
   );
   const ibwInKg = Math.round(ibw / 2.2);
   const adjustedIBWInKg = Math.round(adjustedIBW / 2.2);

   console.log('bmi: ', bmi);

   let nonObeseActivityLevelCalories;

   switch (activityLevel) {
      case 1:
         nonObeseActivityLevelCalories = 0;
         break;
      case 1.2:
         nonObeseActivityLevelCalories = 150;
         break;
      case 1.5:
         nonObeseActivityLevelCalories = 300;
         break;
      default:
         nonObeseActivityLevelCalories = 0;
   }

   if (bmi >= 30) {
      switch (goal) {
         case 'weight_loss':
            total_calories =
               Math.round(mifflinEnergyNeeds * activityLevel) - 250;
            total_protein = Math.round(adjustedIBWInKg * 1.8);
            break;
         case 'gain_muscle':
            total_calories =
               Math.round(mifflinEnergyNeeds * activityLevel) + 250;
            total_protein = Math.round(adjustedIBWInKg * 1.8);
            break;
         default:
            total_calories = Math.round(mifflinEnergyNeeds * activityLevel);
            total_protein = Math.round(adjustedIBWInKg * 1.2);
      }
   } else if (bmi < 30 && bmi >= 25) {
      // if person overweight but not obese use ideal body weight for protein and energy needs
      switch (goal) {
         case 'weight_loss':
            total_calories =
               Math.round(ibwInKg * 24) + nonObeseActivityLevelCalories;
            total_protein = Math.round(ibwInKg * 1.8);
            break;
         case 'gain_muscle':
            total_calories =
               Math.round(ibwInKg * 32) + nonObeseActivityLevelCalories;
            total_protein = Math.round(ibwInKg * 1.8);
            break;
         default:
            total_calories =
               Math.round(ibwInKg * 28) + nonObeseActivityLevelCalories;
            total_protein = Math.round(ibwInKg * 1.2);
      }
   } else {
      // if person normal weight use normal weight in kg
      switch (goal) {
         case 'weight_loss':
            total_calories =
               Math.round(weightInKg * 24) + nonObeseActivityLevelCalories;
            total_protein = Math.round(weightInKg * 1.8);
            break;
         case 'gain_muscle':
            total_calories =
               Math.round(weightInKg * 32) + nonObeseActivityLevelCalories;
            total_protein = Math.round(weightInKg * 1.8);
            break;
         default:
            total_calories =
               Math.round(weightInKg * 28) + nonObeseActivityLevelCalories;
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
