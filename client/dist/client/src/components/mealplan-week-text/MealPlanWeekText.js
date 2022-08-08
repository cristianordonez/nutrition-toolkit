"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealPlanWeekText = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
require("./MealPlanWeekText.scss");
var startOfWeek_1 = __importDefault(require("date-fns/startOfWeek"));
var format_1 = __importDefault(require("date-fns/format"));
var endOfWeek_1 = __importDefault(require("date-fns/endOfWeek"));
var material_2 = require("@mui/material");
var MealPlanWeekText = function (_a) {
    var currentDay = _a.currentDay;
    var startDate = (0, format_1.default)((0, startOfWeek_1.default)(new Date(currentDay)), 'MMMM dd, yyyy');
    var endDate = (0, format_1.default)((0, endOfWeek_1.default)(new Date(currentDay)), 'MMMM dd, yyyy');
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Paper, { className: 'mealplan-week-text', color: 'secondary' },
            react_1.default.createElement(material_2.Typography, { variant: 'body1' }, "Viewing Week:"),
            react_1.default.createElement(material_2.Typography, { variant: 'body1' }, startDate),
            react_1.default.createElement(material_2.Typography, { variant: 'body1' }, "-"),
            react_1.default.createElement(material_2.Typography, { variant: 'body1' }, endDate))));
};
exports.MealPlanWeekText = MealPlanWeekText;
//# sourceMappingURL=MealPlanWeekText.js.map