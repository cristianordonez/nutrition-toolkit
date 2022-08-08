"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgeInputField = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var AgeInputField = function (_a) {
    var age = _a.age, setAge = _a.setAge;
    var handleAgeSliderChange = function (event, newValue) {
        setAge(newValue);
    };
    var handleAgeInputChange = function (event) {
        setAge(event.target.value === '' ? '' : Number(event.target.value));
    };
    var handleAgeBlur = function () {
        if (age < 18) {
            setAge(18);
        }
        else if (age > 100) {
            setAge(100);
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Typography, { id: 'input-slider', gutterBottom: true },
            "I am ",
            age,
            " years young"),
        react_1.default.createElement(material_1.Grid, { container: true, spacing: 2, alignItems: 'center' },
            react_1.default.createElement(material_1.Grid, { item: true, xs: true },
                react_1.default.createElement(material_1.Slider, { value: typeof age === 'number' ? age : 0, onChange: handleAgeSliderChange, "aria-labelledby": 'input-slider', min: 18, max: 100 })),
            react_1.default.createElement(material_1.Grid, { item: true },
                react_1.default.createElement(material_1.Input, { value: age, size: 'small', required: true, onChange: handleAgeInputChange, onBlur: handleAgeBlur, "data-testid": 'age-input', inputProps: {
                        step: 1,
                        min: 18,
                        max: 100,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    } })))));
};
exports.AgeInputField = AgeInputField;
//# sourceMappingURL=AgeInputField.js.map