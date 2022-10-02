const nutrientsMap = {
   calories: 'kcal',
   calcium: 'mg',
   cholesterol: 'mg',
   dietary_fiber: 'g',
   iron: 'mg',
   potassium: 'mg',
   protein: 'g',
   saturated_fat: 'g',
   monounsaturated_fat: 'g',
   polyunsaturated_fat: 'g',
   sodium: 'mg',
   sugar: 'g',
   total_carbohydrates: 'g',
   total_fat: 'g',
   trans_fat: 'g',
   vitamin_a: 'IU',
   vitamin_c: 'mg',
   vitamin_d: 'IU',
};

export const getNutrientUnitName = (nutrient: string) => {
   return nutrientsMap[nutrient as keyof typeof nutrientsMap];
};
