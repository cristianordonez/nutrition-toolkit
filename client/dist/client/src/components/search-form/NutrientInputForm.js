"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutrientInputForm = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var NutrientInputForm = function (_a) {
    var handleInputChange = _a.handleInputChange, measurement = _a.measurement, nutrient = _a.nutrient, minValue = _a.minValue, maxValue = _a.maxValue;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Stack, { direction: 'row' },
            react_1.default.createElement(material_1.FormControl, { fullWidth: true, variant: 'standard', sx: { m: 1, mt: 3 } },
                react_1.default.createElement(material_1.Input, { id: "min".concat(nutrient), type: 'number', required: true, "data-testid": 'textfield-min-nutrient', value: minValue, onChange: handleInputChange, endAdornment: react_1.default.createElement(material_1.InputAdornment, { position: 'end' }, measurement), inputProps: {
                        'aria-label': "Minimum ".concat(nutrient),
                    } }),
                react_1.default.createElement(material_1.FormHelperText, null, "Minimum ".concat(nutrient))),
            react_1.default.createElement(material_1.FormControl, { fullWidth: true, variant: 'standard', sx: { m: 1, mt: 3 } },
                react_1.default.createElement(material_1.Input, { id: "max".concat(nutrient), "data-testid": 'textfield-max-nutrient', type: 'number', required: true, value: maxValue, onChange: handleInputChange, endAdornment: react_1.default.createElement(material_1.InputAdornment, { position: 'end' }, measurement), inputProps: {
                        'aria-label': "Maximum ".concat(nutrient),
                    } }),
                react_1.default.createElement(material_1.FormHelperText, null, "Maximum ".concat(nutrient))))));
};
exports.NutrientInputForm = NutrientInputForm;
//# sourceMappingURL=NutrientInputForm.js.map