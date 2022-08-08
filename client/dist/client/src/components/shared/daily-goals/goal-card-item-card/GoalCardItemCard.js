"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalCardItemCard = void 0;
var react_1 = __importDefault(require("react"));
require("./GoalCardItemCard.scss");
var material_1 = require("@mui/material");
var GoalCardItemCard = function (_a) {
    var nutrientsTotal = _a.nutrientsTotal, IconSvg = _a.IconSvg, type = _a.type, page = _a.page, setGoals = _a.setGoals, goals = _a.goals;
    var handleChange = function (event) {
        if (setGoals !== undefined) {
            if (event.target.id === 'Carbohydrates') {
                var totalCarbs = parseInt(event.target.value);
                var minCarbsPerMeal = totalCarbs <= 15 ? 0 : totalCarbs / 3 - 5;
                setGoals(__assign(__assign({}, goals), { total_carbohydrates: totalCarbs, min_carbs_per_meal: Math.floor(minCarbsPerMeal), max_carbs_per_meal: Math.floor(totalCarbs / 3 + 5) }));
            }
            else if (event.target.id == 'Protein') {
                var totalProtein = parseInt(event.target.value);
                var minProteinPerMeal = totalProtein <= 30 ? 0 : totalProtein / 3 - 10;
                setGoals(__assign(__assign({}, goals), { total_protein: totalProtein, min_protein_per_meal: Math.floor(minProteinPerMeal), max_protein_per_meal: Math.floor(totalProtein / 3 + 10) }));
            }
            else if (event.target.id === 'Fat') {
                var totalFat = parseInt(event.target.value);
                var minFatPerMeal = totalFat <= 30 ? 0 : totalFat / 3 - 10;
                setGoals(__assign(__assign({}, goals), { total_fat: totalFat, min_fat_per_meal: Math.floor(minFatPerMeal), max_fat_per_meal: Math.floor(totalFat / 3 + 10) }));
            }
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Card, { sx: { borderRadius: '15%' } },
            react_1.default.createElement(material_1.CardContent, { sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    height: '10rem',
                    width: '10rem',
                    aligItems: 'center',
                    justifyContent: 'center',
                } },
                react_1.default.createElement(IconSvg, { size: '1.5em', className: 'goal-card-icon' }),
                page === 'user-profile' ? (react_1.default.createElement(material_1.Input, { value: "".concat(nutrientsTotal), type: 'number', endAdornment: 'g', fullWidth: true, onInput: handleChange, id: type, required: true, inputProps: { style: { textAlign: 'center' } } })) : (react_1.default.createElement(material_1.Typography, { align: 'center', variant: 'h6' },
                    nutrientsTotal,
                    " g")),
                react_1.default.createElement(material_1.Typography, { align: 'center', variant: 'body2' }, type)))));
};
exports.GoalCardItemCard = GoalCardItemCard;
//# sourceMappingURL=GoalCardItemCard.js.map