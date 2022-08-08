"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalCardItemLinearProgress = void 0;
var material_1 = require("@mui/material");
var react_1 = __importDefault(require("react"));
var GoalCardItemLinearProgress = function (_a) {
    var nutrientsTotal = _a.nutrientsTotal, type = _a.type, nutrientsInMealPlan = _a.nutrientsInMealPlan;
    var percentageTotal;
    if (nutrientsInMealPlan !== undefined) {
        percentageTotal = Math.floor((nutrientsInMealPlan / nutrientsTotal) * 100);
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Card, null,
            react_1.default.createElement(material_1.CardContent, { sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: '240px',
                    flexGrow: '0',
                    gap: '1rem',
                } },
                react_1.default.createElement(material_1.Stack, { direction: 'row', gap: '1rem', alignItems: 'space-between' },
                    react_1.default.createElement(material_1.Typography, { align: 'center', variant: 'body1' }, type),
                    react_1.default.createElement(material_1.Typography, { align: 'center', variant: 'body1', sx: { marginLeft: 'auto' } },
                        Math.floor(nutrientsInMealPlan),
                        " / ",
                        nutrientsTotal,
                        " g")),
                react_1.default.createElement(material_1.LinearProgress, { variant: 'determinate', value: percentageTotal })))));
};
exports.GoalCardItemLinearProgress = GoalCardItemLinearProgress;
//# sourceMappingURL=GoalCardItemLinearProgress.js.map