"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMetrics = void 0;
var useMetrics = function (_a) {
    var age = _a.age, weight = _a.weight, gender = _a.gender, height = _a.height, activityLevel = _a.activityLevel;
    var weightInKg = weight / 2.2;
    var heightInCm = Math.floor(height * 2.54);
    var additionalCalories = gender === 'female' ? -161 : 5;
    var rmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + additionalCalories;
    var result = {};
    result.total_calories = Math.floor(rmr * activityLevel);
    result.min_calories_per_meal = Math.floor(result.total_calories / 3 - 150);
    result.max_calories_per_meal = Math.floor(result.total_calories / 3 + 150);
    result.total_carbohydrates = Math.floor((rmr * 0.45) / 4);
    result.min_carbs_per_meal = Math.floor(result.total_carbohydrates / 3 - 5);
    result.max_carbs_per_meal = Math.floor(result.total_carbohydrates / 3 + 5);
    result.total_protein = Math.floor(weightInKg);
    result.min_protein_per_meal = Math.floor(result.total_protein / 3 - 10);
    result.max_protein_per_meal = Math.floor(result.total_protein / 3 + 10);
    var caloriesLeft = result.total_calories -
        (result.total_carbohydrates * 4 + result.total_protein * 4);
    result.total_fat = Math.floor(caloriesLeft / 9);
    result.min_fat_per_meal = Math.floor(result.total_fat / 3 - 10);
    result.max_fat_per_meal = Math.floor(result.total_fat / 3 + 10);
    return result;
};
exports.useMetrics = useMetrics;
//# sourceMappingURL=useMetrics.js.map