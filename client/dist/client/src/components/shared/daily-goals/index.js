"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyGoals = void 0;
var react_1 = __importDefault(require("react"));
require("./index.scss");
var material_1 = require("@mui/material");
var GoalCardItemLinearProgress_1 = require("./GoalCardItemLinearProgress");
var GoalCardItemCard_1 = require("./goal-card-item-card/GoalCardItemCard");
var bs_1 = require("react-icons/bs");
var gi_1 = require("react-icons/gi");
var fa_1 = require("react-icons/fa");
var DailyGoals = function (_a) {
    var goals = _a.goals, nutritionSummary = _a.nutritionSummary, page = _a.page, setGoals = _a.setGoals, handleSubmitUpdatedGoals = _a.handleSubmitUpdatedGoals;
    var nutrients = ['Carbohydrates', 'Protein', 'Fat'];
    var getNutrientPercentage = function (nutrientEaten, nutrientGoal) {
        return Math.floor((nutrientEaten / nutrientGoal) * 100);
    };
    var calories;
    if (nutritionSummary !== undefined && nutritionSummary.length) {
        calories = getNutrientPercentage(nutritionSummary[5].amount, goals.total_calories);
    }
    console.log('test: ', page);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: 'daily-goals' },
            page === 'mealplan' ? (react_1.default.createElement(material_1.Typography, { variant: 'h6' }, "Today's Macronutrient Totals")) : (react_1.default.createElement(material_1.Typography, { variant: 'h6' }, "Your Daily Macronutrient Goals")),
            page === 'mealplan' &&
                nutritionSummary !== undefined &&
                nutritionSummary.length ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { className: 'daily-goals-kcal' },
                    react_1.default.createElement(material_1.CircularProgress, { variant: 'determinate', size: 200, value: calories, thickness: 1 }),
                    react_1.default.createElement("div", { className: 'daily-goals-kcal-title' },
                        react_1.default.createElement(material_1.Typography, { variant: 'body1', align: 'center' }, "Calories"),
                        react_1.default.createElement(material_1.Typography, { variant: 'h6' },
                            Math.floor(nutritionSummary[5].amount),
                            " /",
                            ' ',
                            goals.total_calories))),
                react_1.default.createElement("div", { className: 'daily-goals-items', "data-testid": 'mealplan-goal-items' },
                    react_1.default.createElement(GoalCardItemLinearProgress_1.GoalCardItemLinearProgress, { type: 'Carbohydrates', nutrientsInMealPlan: nutritionSummary[7].amount, nutrientsTotal: goals.total_carbohydrates }),
                    react_1.default.createElement(GoalCardItemLinearProgress_1.GoalCardItemLinearProgress, { nutrientsTotal: goals.total_protein, type: 'Protein', nutrientsInMealPlan: nutritionSummary[28].amount }),
                    react_1.default.createElement(GoalCardItemLinearProgress_1.GoalCardItemLinearProgress, { nutrientsTotal: goals.total_fat, type: 'Fat', nutrientsInMealPlan: nutritionSummary[11].amount })))) : null,
            page === 'search' ||
                page === 'user-profile' ||
                (page === 'mealplan' && goals !== undefined) ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { className: 'daily-goals-kcal' },
                    react_1.default.createElement(material_1.CircularProgress, { variant: 'determinate', size: 200, value: 100, thickness: 1 }),
                    react_1.default.createElement("div", { className: 'daily-goals-kcal-title' },
                        react_1.default.createElement(material_1.Typography, { align: 'center', variant: 'body1' }, "Total Calories"),
                        react_1.default.createElement(material_1.Typography, { align: 'center', variant: 'h6' }, goals.total_calories))),
                react_1.default.createElement("form", { onSubmit: handleSubmitUpdatedGoals, className: 'daily-goals-items' },
                    react_1.default.createElement(GoalCardItemCard_1.GoalCardItemCard, { type: 'Carbohydrates', IconSvg: fa_1.FaBreadSlice, nutrientsTotal: goals.total_carbohydrates, page: page, setGoals: setGoals, goals: goals }),
                    react_1.default.createElement(GoalCardItemCard_1.GoalCardItemCard, { nutrientsTotal: goals.total_protein, IconSvg: bs_1.BsEggFried, type: 'Protein', page: page, setGoals: setGoals, goals: goals }),
                    react_1.default.createElement(GoalCardItemCard_1.GoalCardItemCard, { nutrientsTotal: goals.total_fat, IconSvg: gi_1.GiAvocado, type: 'Fat', page: page, setGoals: setGoals, goals: goals }),
                    page === 'user-profile' ? (react_1.default.createElement(material_1.Button, { variant: 'contained', fullWidth: true, type: 'submit' }, "Update Goals")) : null))) : null)));
};
exports.DailyGoals = DailyGoals;
//# sourceMappingURL=index.js.map