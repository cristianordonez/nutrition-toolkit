"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightInputField = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var WeightInputField = function (_a) {
    var weight = _a.weight, setWeight = _a.setWeight;
    var handleWeightSliderChange = function (event, newValue) {
        setWeight(newValue);
    };
    var handleWeightInputChange = function (event) {
        setWeight(event.target.value === '' ? '' : Number(event.target.value));
    };
    var handleWeightBlur = function () {
        if (weight < 70) {
            setWeight(70);
        }
        else if (weight > 400) {
            setWeight(400);
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Typography, { id: 'input-slider', gutterBottom: true },
            "I weigh ",
            weight,
            " pounds"),
        react_1.default.createElement(material_1.Grid, { container: true, spacing: 2, alignItems: 'center' },
            react_1.default.createElement(material_1.Grid, { item: true, xs: true },
                react_1.default.createElement(material_1.Slider, { value: typeof weight === 'number' ? weight : 0, onChange: handleWeightSliderChange, min: 70, max: 400, "aria-labelledby": 'weight-input-slider' })),
            react_1.default.createElement(material_1.Grid, { item: true },
                react_1.default.createElement(material_1.Input, { value: weight, size: 'small', onChange: handleWeightInputChange, onBlur: handleWeightBlur, "data-testid": 'weight-input', inputProps: {
                        step: 1,
                        min: 70,
                        max: 400,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    } })))));
};
exports.WeightInputField = WeightInputField;
//# sourceMappingURL=WeightInputField.js.map