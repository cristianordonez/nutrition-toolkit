"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealplanDay = void 0;
var react_1 = __importDefault(require("react"));
var MealplanItem_1 = require("./MealplanItem");
var material_1 = require("@mui/material");
var MealplanDay = function (_a) {
    var mealplanItems = _a.mealplanItems, setMealPlanItems = _a.setMealPlanItems, setOpenSnackbar = _a.setOpenSnackbar, setAlertSeverity = _a.setAlertSeverity, setAlertMessage = _a.setAlertMessage, currentDay = _a.currentDay;
    if (mealplanItems.length) {
        var breakfastItems_1 = [];
        var lunchItems_1 = [];
        var dinnerItems_1 = [];
        mealplanItems.forEach(function (item) {
            if (item.slot === 1) {
                breakfastItems_1.push(item);
            }
            else if (item.slot === 2) {
                lunchItems_1.push(item);
            }
            else {
                dinnerItems_1.push(item);
            }
        });
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(material_1.Stack, { direction: 'column' },
                react_1.default.createElement(material_1.Typography, { variant: 'h3' }, "Morning"),
                react_1.default.createElement(material_1.Grid, { container: true, spacing: 1 }, breakfastItems_1.map(function (item) { return (react_1.default.createElement(react_1.default.Fragment, { key: item.id },
                    react_1.default.createElement(MealplanItem_1.MealplanItem, { position: item.position, type: item.type, id: item.value.id, shoppingListId: item.id, servings: item.value.servings, title: item.value.title, setOpenSnackbar: setOpenSnackbar, setAlertSeverity: setAlertSeverity, setAlertMessage: setAlertMessage, setMealPlanItems: setMealPlanItems, currentDay: currentDay }))); }))),
            react_1.default.createElement(material_1.Stack, { direction: 'column' },
                react_1.default.createElement(material_1.Typography, { variant: 'h3' }, "Afternoon"),
                react_1.default.createElement(material_1.Grid, { container: true, spacing: 1 }, lunchItems_1.map(function (item) { return (react_1.default.createElement(react_1.default.Fragment, { key: item.id },
                    react_1.default.createElement(MealplanItem_1.MealplanItem, { position: item.position, type: item.type, id: item.value.id, shoppingListId: item.id, servings: item.value.servings, title: item.value.title, setOpenSnackbar: setOpenSnackbar, setAlertSeverity: setAlertSeverity, setAlertMessage: setAlertMessage, setMealPlanItems: setMealPlanItems, currentDay: currentDay }))); }))),
            react_1.default.createElement(material_1.Stack, { direction: 'column' },
                react_1.default.createElement(material_1.Typography, { variant: 'h3' }, "Evening"),
                react_1.default.createElement(material_1.Grid, { container: true, spacing: 1 }, dinnerItems_1.map(function (item) { return (react_1.default.createElement(react_1.default.Fragment, { key: item.id },
                    react_1.default.createElement(MealplanItem_1.MealplanItem, { position: item.position, type: item.type, id: item.value.id, shoppingListId: item.id, servings: item.value.servings, title: item.value.title, setOpenSnackbar: setOpenSnackbar, setAlertSeverity: setAlertSeverity, setAlertMessage: setAlertMessage, setMealPlanItems: setMealPlanItems, currentDay: currentDay }))); })))));
    }
    else {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(material_1.Typography, { variant: 'h3' }, "Morning"),
            react_1.default.createElement(material_1.Typography, { variant: 'h3' }, "Afternoon"),
            react_1.default.createElement(material_1.Typography, { variant: 'h3' }, "Evening")));
    }
};
exports.MealplanDay = MealplanDay;
//# sourceMappingURL=index.js.map