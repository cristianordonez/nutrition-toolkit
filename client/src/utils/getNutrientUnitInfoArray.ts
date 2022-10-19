const nutrientsMap = {
   calories: ['Calories', ''],
   total_fat: ['Total Fat', 'g'],
   saturated_fat: ['Saturated Fat', 'g'],
   trans_fat: ['Trans Fat', 'g'],
   cholesterol: ['Cholesterol', 'mg'],
   sodium: ['Sodium', 'mg'],
   total_carbohydrates: ['Total Carbohydrates', 'g'],
   dietary_fiber: ['Dietary Fiber', 'g'],
   total_sugars: ['Total Sugars', 'g'],
   protein: ['Protein', 'g'],
   vitamin_d: ['Vitamin D', 'mcg'],
   calcium: ['Calcium', 'mg'],
   iron: ['Iron', 'mg'],
   potassium: ['Potassium', 'mg'],
};

const getNutrientFormattedName = (nutrient: string): string => {
   return nutrientsMap[nutrient as keyof typeof nutrientsMap][0];
};

const getNutrientUnitSize = (nutrient: string): string => {
   return nutrientsMap[nutrient as keyof typeof nutrientsMap][1];
};

export { getNutrientFormattedName, getNutrientUnitSize };
