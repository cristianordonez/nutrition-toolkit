"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGoals = exports.getGoals = exports.createGoals = void 0;
var db_1 = require("../database/db");
var createGoals = function (goals) {
    var dbQuery = "INSERT INTO daily_goals (total_carbohydrates, min_carbs_per_meal,\n      max_carbs_per_meal, total_protein, min_protein_per_meal, max_protein_per_meal,\n      total_fat, min_fat_per_meal, max_fat_per_meal, total_calories, min_calories_per_meal,\n      max_calories_per_meal, user_id) VALUES (".concat(goals.total_carbohydrates, ", ").concat(goals.min_carbs_per_meal, ",\n         ").concat(goals.max_carbs_per_meal, ", ").concat(goals.total_protein, ", ").concat(goals.min_protein_per_meal, ", ").concat(goals.max_protein_per_meal, ",\n          ").concat(goals.total_fat, ", ").concat(goals.min_fat_per_meal, ", ").concat(goals.max_fat_per_meal, ",\n           ").concat(goals.total_calories, ", ").concat(goals.min_calories_per_meal, ", ").concat(goals.max_calories_per_meal, ", '").concat(goals.user_id, "')\n\n           ON CONFLICT (user_id) DO UPDATE SET total_carbohydrates=").concat(goals.total_carbohydrates, ", min_carbs_per_meal=").concat(goals.min_carbs_per_meal, ",\n         max_carbs_per_meal=").concat(goals.max_carbs_per_meal, ", total_protein=").concat(goals.total_protein, ", min_protein_per_meal=").concat(goals.min_protein_per_meal, ", max_protein_per_meal=").concat(goals.max_protein_per_meal, ",\n          total_fat=").concat(goals.total_fat, ", min_fat_per_meal=").concat(goals.min_fat_per_meal, ", max_fat_per_meal=").concat(goals.max_fat_per_meal, ",\n           total_calories=").concat(goals.total_calories, ", min_calories_per_meal=").concat(goals.min_calories_per_meal, ", max_calories_per_meal=").concat(goals.max_calories_per_meal, " ");
    console.log('dbQuery in creategoals model ', dbQuery);
    var response = db_1.db.query(dbQuery);
    return response;
};
exports.createGoals = createGoals;
var getGoals = function (user_id) {
    console.log('user_id:', user_id);
    console.log('here in get goals');
    var dbQuery = "SELECT total_carbohydrates, min_carbs_per_meal,\n    max_carbs_per_meal, total_protein,\n      min_protein_per_meal, max_protein_per_meal,\n      total_fat, min_fat_per_meal, max_fat_per_meal,\n      total_calories, min_calories_per_meal, max_calories_per_meal,\n      user_id FROM daily_goals WHERE user_id = '".concat(user_id, "'");
    var response = db_1.db.query(dbQuery);
    return response;
};
exports.getGoals = getGoals;
var updateGoals = function (goals) {
    var dbQuery = "\n   UPDATE daily_goals\n   SET total_carbohydrates = ".concat(goals.total_carbohydrates, ",\n   min_carbs_per_meal = ").concat(goals.min_carbs_per_meal, ",\n   max_carbs_per_meal = ").concat(goals.max_carbs_per_meal, ",\n   total_protein = ").concat(goals.total_protein, ",\n   min_protein_per_meal = ").concat(goals.min_protein_per_meal, ",\n   max_protein_per_meal = ").concat(goals.max_protein_per_meal, ",\n   total_fat = ").concat(goals.total_fat, ",\n   min_fat_per_meal = ").concat(goals.min_fat_per_meal, ",\n   max_fat_per_meal = ").concat(goals.max_fat_per_meal, ",\n   total_calories = ").concat(goals.total_calories, ",\n   min_calories_per_meal = ").concat(goals.min_calories_per_meal, ",\n   max_calories_per_meal = ").concat(goals.max_calories_per_meal, "\n   WHERE user_id = ").concat(goals.user_id, "\n   ");
    console.log('dbQuery: ', dbQuery);
    var response = db_1.db.query(dbQuery);
    return response;
};
exports.updateGoals = updateGoals;
//# sourceMappingURL=dailyGoals.model.js.map